import DashboardCard from "../../components/cards/DashboardCard";
import {
  FaUsers,
  FaCalendarDay,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";
import { MdLocationOn, MdCalendarToday } from "react-icons/md";
import Layout from "../../components/layouts/MarketingLayout";
import DataTableServer from "../../components/tables/DataTableServer"; // Assuming this is the correct import path
import axios from "axios";
import { useState, useEffect } from "react";
import { formatDateMonth } from "../../utils/converter";
import ModalGeneral from "../../components/cards/ModalGeneral";
import localforage from "localforage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  // State variables
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalAttendance: 0,
    todayAttendance: 0,
    mostFrequentUser: "",
    lastLocation: "",
    lastAttendance: "",
  });
  const [modals, setModals] = useState({
    isImageOpen: false,
    isGeneralOpen: false,
    imageSrc: "",
    title: "",
    content: "",
  });
  const [page, setPage] = useState(1); // State for pagination
  const [rows, setRows] = useState([]); // State for storing table data
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
  const itemsPerPage = 10; // Number of items per page
  const [userData, setUserData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);
  // Columns for DataTableServer
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
        <span
          className="cursor-pointer"
          onClick={() => openGeneralModal("Location", params.row.address)}
        >
          {params.row.address}
        </span>
      ),
    },
    {
      field: "checkin_photo",
      headerName: "Photo",
      flex: 1,
      renderCell: (params) => renderImageCell(params.row.checkin_photo),
    },
    {
      field: "checkin_signature",
      headerName: "Signature",
      flex: 1,
      renderCell: (params) => renderImageCell(params.row.checkin_signature),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: (params) => (
        <span
          className="cursor-pointer"
          onClick={() =>
            openGeneralModal("Description", params.row.description)
          }
        >
          {params.row.description}
        </span>
      ),
    },
    {
      field: "product_desc",
      headerName: "Product Offered",
      flex: 1,
      renderCell: (params) => (
        <span
          className="cursor-pointer"
          onClick={() =>
            openGeneralModal("Product Offered", params.row.product_desc)
          }
        >
          {params.row.product_desc}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${params.row.location_lat},${params.row.location_long}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View on Map
        </a>
      ),
    },
  ];

  // Helper functions for modals
  const renderImageCell = (src) =>
    src ? (
      <img
        src={src}
        alt="Checkin Image"
        className="h-16 w-16 cursor-pointer rounded-full object-cover"
        onClick={() => openImageModal(src)}
      />
    ) : (
      <span>-</span>
    );

  const openImageModal = (imageUrl) =>
    setModals({ ...modals, isImageOpen: true, imageSrc: imageUrl });
  const openGeneralModal = (title, content) =>
    setModals({ ...modals, isGeneralOpen: true, title, content });
  const closeModal = () =>
    setModals({ ...modals, isImageOpen: false, isGeneralOpen: false });

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/data/marketing/dashboard`,
        { user_id: userData.user_id, role_id: userData.role_id }
      );
      setDashboardStats(response.data.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const fetchTableData = async (page, itemsPerPage, searchQuery = "") => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/attendance/list`,
        {
          user_id: userData.role_id == 1 ? selectedUserId : userData.user_id,
          role_id: userData.role_id,
          page,
          itemsPerPage,
          search_query: searchQuery,
          start_date: startDate ? startDate.toISOString() : null,
          end_date: endDate ? endDate.toISOString() : null,
        }
      );

      const rows = response.data.data.results.map((item, index) => ({
        id: index + 1 + (page - 1) * itemsPerPage,
        ...item,
        date: formatDateMonth(item.date),
      }));
      setRows(rows);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching table data:", error);
      return { rows: [], totalPages: 1 };
    }
  };

  const getUserData = async () => {
    const user = await localforage.getItem("user_data");
    if (user) {
      setUserData(user);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/data/users`
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchDashboardStats();
      fetchTableData(page, itemsPerPage);
    }
  }, [userData, page, startDate, endDate, selectedUserId]);

  if (!userData) {
    return (
      <div className="min-h-screen h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Layout>
      <main className="flex flex-col gap-4 mb-10">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/marketing/dashboard"
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

        <h1 className="text-3xl font-medium pb-3">Marketing Dashboard Page</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title={userData.user_id === 1 ? "Total User" : "Last Attendance"}
            description={
              userData.user_id === 1
                ? dashboardStats.totalUsers // For user_id === 1, show the total user count
                : dashboardStats.lastAttendance
                ? formatDateMonth(dashboardStats.lastAttendance)
                : "-" // For others, show the last attendance date formatted
            }
            icon={userData.user_id === 1 ? FaUsers : MdCalendarToday}
            className="w-full sm:w-auto"
          />
          <DashboardCard
            title="Today Attendance"
            description={dashboardStats.todayAttendance} // Display today's attendance
            icon={FaCalendarDay}
            className="w-full sm:w-auto"
          />
          <DashboardCard
            title="Total Attendance"
            description={dashboardStats.totalAttendance} // Display total attendance
            icon={FaClipboardList}
            className="w-full sm:w-auto"
          />
          <DashboardCard
            title={
              userData.user_id === 1 ? "Most Frequent User" : "Last Location"
            }
            description={
              userData.user_id === 1 ? (
                typeof dashboardStats.mostFrequentUser === "object" &&
                dashboardStats.mostFrequentUser !== null ? (
                  dashboardStats.mostFrequentUser.name // For user_id === 1, show most frequent user
                ) : (
                  dashboardStats.mostFrequentUser
                ) // In case the most frequent user is just a string (fallback)
              ) : (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${dashboardStats.lastLocation?.latitude},${dashboardStats.lastLocation?.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 hover:underline"
                >
                  View on Map{" "}
                  {/* For others, show the last location with a map link */}
                </a>
              )
            }
            icon={userData.user_id === 1 ? FaUser : MdLocationOn}
            className="w-full sm:w-auto"
          />
        </div>
        <div className="flex gap-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="border p-2"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="border p-2"
          />
          {userData && userData.role_id === 1 && (
            <select
              value={selectedUserId || ""}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="border p-2"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <DataTableServer
          columns={columns}
          rows={rows}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
        />
        {modals.isImageOpen && (
          <div
            className="overlay fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-70"
            onClick={closeModal}
          >
            <img
              src={modals.imageSrc}
              alt="Enlarged Checkin"
              className="max-h-full max-w-full p-4"
            />
          </div>
        )}

        <ModalGeneral
          isOpen={modals.isGeneralOpen}
          onClose={closeModal}
          title={modals.title}
          content={modals.content}
        />
      </main>
    </Layout>
  );
}
