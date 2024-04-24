import DashboardCard from "../../components/cards/DashboardCard";
import {
  FaUsers,
  FaCalendarDay,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { MdCalendarToday } from "react-icons/md";
import Layout from "../../components/layouts/MarketingLayout";
import DataTable from "../../components/tables/DataTable";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { formatDateMonth } from "../../utils/converter";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUser, setTotalUser] = useState(0);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [todayAttendance, setTodayAttendance] = useState(0);
  const [mostFrequentUser, setMostFrequentUser] = useState("");
  const [lastLocation, setLastLocation] = useState("");
  const [lastAttendance, setLastAttendance] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState("");
  const userData = useSelector((state) => state.user.User);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "checkin_time", headerName: "Time", flex: 1 },
    { field: "address", headerName: "Location", flex: 1 },
    {
      field: "checkin_photo",
      headerName: "Photo",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3 ">
          {params.row.checkin_photo ? (
            <img
              src={params.row.checkin_photo}
              alt="Photo"
              className="h-16 w-16 cursor-pointer rounded-full object-cover"
              onClick={() => openModal(params.row.checkin_photo)}
            />
          ) : (
            <span>-</span>
          )}
        </div>
      ),
    },
    {
      field: "checkin_signature",
      headerName: "Signature",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3 ">
          {params.row.checkin_signature ? (
            <img
              src={params.row.checkin_signature}
              alt="Signature"
              className="h-16 w-16 cursor-pointer rounded-full object-cover"
              onClick={() => openModal(params.row.checkin_signature)}
            />
          ) : (
            <span>-</span>
          )}
        </div>
      ),
    },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "product_desc", headerName: "Product Offered", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3 ">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${params.row.location_lat},${params.row.location_long}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View on Map
          </a>
        </div>
      ),
    },
  ];
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/attendance/list`,
        {
          user_id: userData.id,
          role_id: userData.role_id,
        }
      );
      const modifiedData = response.data.data.map((item, index) => ({
        id: index + 1,
        user_id: item.user_id,
        name: item.name,
        date: formatDateMonth(item.date),
        checkin_time: item.checkin_time,
        address: item.address,
        checkin_photo: item.checkin_photo,
        checkin_signature: item.checkin_signature,
        description: item.description,
        product_desc: item.product_desc,
        location_lat: item.location_lat,
        location_long: item.location_long,
      }));
      setRows(modifiedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchMasterData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/data/marketing/dashboard`,
        {
          user_id: userData.id,
          role_id: userData.role_id,
        }
      );
      console.log(response.data.data);
      if (userData.role_id == 1) {
        setTotalUser(response.data.data.totalUsers);
        setTotalAttendance(response.data.data.totalAttendance);
        setTodayAttendance(response.data.data.todayAttendance);
        setMostFrequentUser(response.data.data.mostFrequentUser.name);
      } else {
        setTotalAttendance(response.data.data.totalAttendance);
        setTodayAttendance(response.data.data.todayAttendance);
        setLastLocation(response.data.data.lastLocation);
        setLastAttendance(response.data.data.lastAttendance);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterData();
    if (userData) {
      fetchData();
    }
  }, [userData]);

  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Marketing
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between">
          <h1 className="text-3xl pb-3 font-medium">
            Marketing Dashboard Page
          </h1>
        </div>

        <div className="flex gap-6 ">
          <DashboardCard
            title={userData.id === 1 ? "Total User" : "Last Attendance"}
            description={
              userData.id === 1 ? totalUser : formatDateMonth(lastAttendance)
            }
            icon={userData.id === 1 ? FaUsers : MdCalendarToday}
          />
          <DashboardCard
            title="Today Attendance"
            description={todayAttendance}
            icon={FaCalendarDay}
          />
          <DashboardCard
            title="Total Attendance"
            description={totalAttendance}
            icon={FaClipboardList}
          />
          <DashboardCard
            title={userData.id === 1 ? "Most Frequent User" : "Last Location"}
            description={
              userData.id === 1 ? (
                mostFrequentUser
              ) : (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${lastLocation?.latitude},${lastLocation?.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 hover:underline"
                >
                  View on Map
                </a>
              )
            }
            icon={userData.id === 1 ? FaUser : MdLocationOn}
          />
        </div>
        <DataTable rows={rows} columns={columns} loading={loading} />

        {modalIsOpen && (
          <div
            className="overlay fixed inset-0  top-0 left-0 z-50 flex  h-full w-full items-center justify-center bg-gray-500 bg-opacity-70"
            onClick={closeModal}
          >
            <img
              src={selectedImage}
              alt="Enlarged Checkin Photo"
              className="max-h-full max-w-full p-4"
            />
          </div>
        )}
      </main>
    </Layout>
  );
}
