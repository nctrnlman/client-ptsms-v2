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
import ModalGeneral from "../../components/cards/ModalGeneral";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [masterDataLoading, setMasterDataLoading] = useState(true);
  const [totalUser, setTotalUser] = useState(0);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [todayAttendance, setTodayAttendance] = useState(0);
  const [mostFrequentUser, setMostFrequentUser] = useState("");
  const [lastLocation, setLastLocation] = useState("");
  const [lastAttendance, setLastAttendance] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalGeneralIsOpen, setModalGeneralIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [selectedImage, setSelectedImage] = useState("");
  const userData = useSelector((state) => state.user.User);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "checkin_time", headerName: "Time", flex: 1 },
    {
      field: "address",
      headerName: "Location",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3">
          <span
            className="cursor-pointer "
            onClick={() => openGeneralModal("Location", params.row.address)}
          >
            {params.row.address}
          </span>
        </div>
      ),
    },
    {
      field: "checkin_photo",
      headerName: "Photo",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3 pl-4">
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
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3">
          <span
            className="cursor-pointer "
            onClick={() =>
              openGeneralModal("Description", params.row.description)
            }
          >
            {params.row.description}
          </span>
        </div>
      ),
    },
    {
      field: "product_desc",
      headerName: "Product Offered",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3">
          <span
            className="cursor-pointer "
            onClick={() =>
              openGeneralModal("Product Offered", params.row.product_desc)
            }
          >
            {params.row.product_desc}
          </span>
        </div>
      ),
    },
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

  const openGeneralModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setModalGeneralIsOpen(true);
  };

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
    setModalGeneralIsOpen(false);
  };

  const fetchMasterData = async () => {
    try {
      setMasterDataLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/data/marketing/dashboard`,
        {
          user_id: userData.id,
          role_id: userData.role_id,
        }
      );
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
      setMasterDataLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMasterDataLoading(false);
    }
  };

  useEffect(() => {
    if (userData.id) {
      const fetchDataAsync = async () => {
        await fetchMasterData();
        await fetchData();
      };
      fetchDataAsync();
    }
  }, [userData]);

  return (
    <Layout>
      <main className="flex flex-col gap-4 pb-36">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-col-4 gap-4 ">
          <DashboardCard
            title={userData.id === 1 ? "Total User" : "Last Attendance"}
            description={
              userData.id === 1
                ? totalUser || "Data not available" // Menambahkan pesan default jika totalUser tidak ada
                : lastAttendance
                ? formatDateMonth(lastAttendance)
                : "Data not available" // Menambahkan pesan default jika lastAttendance tidak ada
            }
            icon={userData.id === 1 ? FaUsers : MdCalendarToday}
            className="w-full sm:w-auto"
            isLoading={masterDataLoading}
          />

          <DashboardCard
            title="Today Attendance"
            description={todayAttendance || "Data not available"}
            icon={FaCalendarDay}
            className="w-full sm:w-auto"
            isLoading={masterDataLoading}
          />

          <DashboardCard
            title="Total Attendance"
            description={totalAttendance || "Data not available"}
            icon={FaClipboardList}
            className="w-full sm:w-auto"
            isLoading={masterDataLoading}
          />

          <DashboardCard
            title={userData.id === 1 ? "Most Frequent User" : "Last Location"}
            description={
              userData.id === 1 ? (
                mostFrequentUser || "Data not available"
              ) : lastLocation ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${lastLocation.latitude},${lastLocation.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 hover:underline"
                >
                  View on Map
                </a>
              ) : (
                "Location data not available"
              )
            }
            icon={userData.id === 1 ? FaUser : MdLocationOn}
            className="w-full sm:w-auto"
            isLoading={masterDataLoading}
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

        <ModalGeneral
          isOpen={modalGeneralIsOpen}
          onClose={closeModal}
          title={modalTitle}
          content={modalContent}
        />
      </main>
    </Layout>
  );
}
