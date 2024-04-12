import DashboardCard from "../../../components/cards/DashboardCard";
import {
  FaUsers,
  FaCalendarDay,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";
import Layout from "../../../components/layouts/OperasionalLayout";
import DataTable from "../../../components/tables/DataTable";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "customer_name", headerName: "First name", width: 150 },
    { field: "created_at", headerName: "Last name", width: 150 },
    { field: "age", headerName: "Age", type: "number", width: 110 },
  ];

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCreateClick = () => {
    navigate("/operasional/supplier/form");
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/supplier/all`
      );
      setRows(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                Operational
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
                  Suppliers
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between">
          <h1 className="text-3xl pb-3 font-medium">
            Suppliers Dashboard Page
          </h1>
          <button
            onClick={handleCreateClick}
            className="bg-brand-500 flex  items-center hover:bg-brand-800 text-white font-bold p-3 rounded-full"
          >
            Create
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-6 ">
          <DashboardCard title="Total Users" description="100" icon={FaUsers} />
          <DashboardCard
            title="Today Attendance"
            description="50"
            icon={FaCalendarDay}
          />
          <DashboardCard
            title="Total Attendance"
            description="1000"
            icon={FaClipboardList}
          />
          <DashboardCard
            title="Most Frequent User"
            description="John Doe"
            icon={FaUser}
          />
        </div>
        <DataTable rows={rows} columns={columns} loading={loading} />
      </main>
    </Layout>
  );
}
