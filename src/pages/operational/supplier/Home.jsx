import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUsers,
  FaCalendarDay,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";
import { formatDate, formatCurrency } from "../../../utils/converter";
import { encryptNumber } from "../../../utils/encryptionUtils";
import Layout from "../../../components/layouts/OperasionalLayout";
import DataTable from "../../../components/tables/DataTable";
import DashboardCard from "../../../components/cards/DashboardCard";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSupplier, setTotalSupplier] = useState(0);
  const [todayTransaction, setTodayTransaction] = useState(0);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [mostSupplierTransaction, setMostSupplierTransaction] = useState("");
  const navigate = useNavigate();

  // column table
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "no_kita", headerName: "No Kita" },
    { field: "no_faktur", headerName: "No Faktur" },
    { field: "supplier_name", headerName: "Distributor name" },
    { field: "payment_method", headerName: "Payment Method" },
    { field: "created_at", headerName: "Created Date" },
    { field: "time_to_payment", headerName: "Time To Payment" },
    { field: "shipping_cost", headerName: "Shipping Cost" },
    { field: "amount", headerName: "Total Transaction" },
    { field: "amount_tax", headerName: "Total Transaction with Tax" },
    { field: "pic", headerName: "PIC" },
    { field: "note", headerName: "Note" },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <div className="flex gap-3 ">
          <button
            className=" text-brand-500  hover:text-brand-800 font-bold"
            onClick={() => handleEdit(params.row.transaction_id)}
          >
            Detail
          </button>
        </div>
      ),
    },
  ];

  // handle actions

  const handleCreateClick = () => {
    navigate("/operasional/supplier/transaction/in/form");
  };

  const handleDistributorClick = () => {
    navigate("/operasional/distributors");
  };

  const handleEdit = (id) => {
    navigate(`/operasional/supplier/transaction/detail/${encryptNumber(id)}`);
  };

  // logic services

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/in`
      );

      const modifiedData = response.data.data.map((item, index) => ({
        id: index + 1,
        no_kita: item.no_kita || "-",
        transaction_id: item.transaction_in_id || "-",
        no_faktur: item.no_faktur || "-",
        supplier_name:
          item.supplier_name && item.supplier_code
            ? `${item.supplier_name}-(${item.supplier_code})`
            : "-",
        payment_method: item.payment_method || "-",
        created_at: item.created_at ? formatDate(item.created_at) : "-",
        time_to_payment: item.time_to_payment
          ? formatDate(item.time_to_payment)
          : "-",
        shipping_cost: item.shipping_cost
          ? formatCurrency(item.shipping_cost)
          : "-",
        amount: item.amount ? formatCurrency(item.amount) : "-",
        amount_tax: item.amount_tax ? formatCurrency(item.amount_tax) : "-",
        pic: item.name || "-",
        note: item.note || "-",
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
        `${import.meta.env.VITE_API_BASE_URL}/suppliers/master`
      );
      setTotalSupplier(response.data.data.totalSuppliers);
      setMostSupplierTransaction(response.data.data.mostSupplierTransaction);
      setTotalTransaction(response.data.data.totalTransactions);
      setTodayTransaction(response.data.data.todayTransactions);
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
                href="/operasional/dashboard"
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

        <div className="flex flex-col sm:flex-row justify-between">
          <h1 className="text-3xl pb-3 font-medium">
            Suppliers Dashboard Page
          </h1>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleDistributorClick}
              className="bg-white flex  items-center border border-teal-500 hover:bg-gray-100 text-teal-500 font-bold p-3 rounded-full"
            >
              Distributor
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
            <button
              onClick={handleCreateClick}
              className="bg-teal-500 flex  items-center hover:bg-teal-800 text-white font-bold p-3 rounded-full"
            >
              Add Transaction In
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Supplier"
            description={totalSupplier}
            icon={FaUsers}
            className="w-full sm:w-auto"
          />
          <DashboardCard
            title="Today Transaction"
            description={todayTransaction}
            icon={FaCalendarDay}
            className="w-full sm:w-auto"
          />
          <DashboardCard
            title="Total Transaction"
            description={totalTransaction}
            icon={FaClipboardList}
            className="w-full sm:w-auto"
          />
          <DashboardCard
            title="Most Frequent Distributor"
            description={mostSupplierTransaction}
            icon={FaUser}
            className="w-full sm:w-auto"
          />
        </div>
        <div className="overflow-x-auto">
          <DataTable rows={rows} columns={columns} loading={loading} />
        </div>
      </main>
    </Layout>
  );
}
