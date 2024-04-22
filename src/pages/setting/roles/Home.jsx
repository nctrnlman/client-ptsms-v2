import { useState, useEffect } from "react";
import DashboardCard from "../../../components/cards/DashboardCard";
import {
  FaUsers,
  FaCalendarDay,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";
import Layout from "../../../components/layouts/SettingLayout";
import DataTable from "../../../components/tables/DataTable";
import axios from "axios";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSupplier, setTotalSupplier] = useState(0);
  const [todayTransaction, setTodayTransaction] = useState(0);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [mostSupplierTransaction, setMostSupplierTransaction] = useState("");
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Role Name", flex: 1 },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/auth/role/all`
      );
      const modifiedData = response.data.data.map((item, index) => ({
        id: index + 1,
        role_id: item.role_id,
        name: item.name,
      }));
      setRows(modifiedData);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchMasterData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/supplier/master`
      );
      setTotalSupplier(response.data.data.totalSupplier);
      setMostSupplierTransaction(response.data.data.mostSupplierTransaction);
      setTotalTransaction(response.data.data.totalTransaction);
      setTodayTransaction(response.data.data.todayTransaction);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterData();
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
                Setting
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
                  Roles
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between">
          <h1 className="text-3xl pb-3 font-medium">Roles Page</h1>
        </div>

        <div className="flex gap-6 ">
          <DashboardCard
            title="Total Supplier"
            description={totalSupplier}
            icon={FaUsers}
          />
          <DashboardCard
            title="Today Transaction"
            description={todayTransaction}
            icon={FaCalendarDay}
          />
          <DashboardCard
            title="Total Transaction"
            description={totalTransaction}
            icon={FaClipboardList}
          />
          <DashboardCard
            title="Most Frequent Distributor"
            description={mostSupplierTransaction}
            icon={FaUser}
          />
        </div>
        <DataTable rows={rows} columns={columns} loading={loading} />
      </main>
    </Layout>
  );
}
