import Layout from "../../../components/layouts/OperasionalLayout";
import DashboardCard from "../../../components/cards/DashboardCard";
import { FaCalendarDay, FaClipboardList } from "react-icons/fa";
import DataTable from "../../../components/tables/DataTable";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, formatCurrency } from "../../../utils/converter";
import { decryptNumber, encryptNumber } from "../../../utils/encryptionUtils";
import ModalDelete from "../../../components/cards/ModalDelete"; // Import ModalDelete component

export default function CustomerDetail() {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [customerId, setCustomerId] = useState(0);
  const [todayTransaction, setTodayTransaction] = useState(0);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [customerName, setCustomerName] = useState("Customer");
  const [loading, setLoading] = useState(true);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null); // State for selected transaction ID
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State for delete modal visibility
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "no_faktur", headerName: "No Faktur", flex: 1 },
    { field: "no_po", headerName: "No PO", flex: 1 },
    { field: "salesman", headerName: "Salesman", flex: 1 },
    { field: "created_at", headerName: "Order Date", flex: 1 },
    { field: "delivery_date", headerName: "Delivery Date", flex: 1 },
    { field: "payment_method", headerName: "Payment Method", flex: 1 },
    { field: "time_to_payment", headerName: "Turn off Payment", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "amount_tax", headerName: "Amount Tax", flex: 1 },
    { field: "note", headerName: "Note", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3 ">
          <button
            className=" text-brand-500  hover:text-brand-800 font-bold"
            onClick={() => handleEdit(params.row.transaction_id)}
          >
            Edit
          </button>
          <button
            className=" text-red-500 hover:text-red-800 font-bold "
            onClick={() => handleDelete(params.row.transaction_id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleCreateClick = () => {
    navigate(
      `/operasional/customer/transaction/out/form/${encryptNumber(customerId)}`
    );
  };

  const handleDelete = (id) => {
    setSelectedTransactionId(id);
    setDeleteModalOpen(true);
  };

  const handleEdit = (id) => {
    console.log(id);
    navigate(`/operasional/customer/transaction/detail/${encryptNumber(id)}`);
  };

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/out/list/${id}`
      );
      const modifiedData = response.data.data.map((item, index) => ({
        id: index + 1,
        transaction_id: item.transaction_out_id,
        no_faktur: item.no_faktur,
        no_po: item.no_po,
        salesman: item.salesman,
        created_at: formatDate(item.created_at),
        delivery_date: formatDate(item.delivery_date),
        payment_method: item.payment_method,
        time_to_payment: formatDate(item.time_to_payment),
        amount: formatCurrency(item.amount),
        amount_tax: formatCurrency(item.amount_tax),
        note: item.note,
      }));
      setRows(modifiedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchMasterData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/customer/master/${id}`
      );
      setTotalTransaction(response.data.data.totalTransaction);
      setTodayTransaction(response.data.data.todayTransaction);
      setCustomerName(response.data.data.customerName);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setCustomerId(decryptNumber(id));
    fetchMasterData(decryptNumber(id));
    fetchData(decryptNumber(id));
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
                 href="/operasional/customers"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Customers
                </a>
              </div>
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
                  Transaction
                </a>
              </div>
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
                  Detail{" "}
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between">
          <h1 className="text-3xl pb-3 font-medium">
            {customerName} Transaction List
          </h1>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCreateClick}
              className="bg-teal-500 flex  items-center hover:bg-teal-800 text-white font-bold p-3 rounded-full"
            >
              Add Transaction
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

        <div className="flex gap-6 ">
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
        </div>

        {/* Render DataTable component */}
        <DataTable rows={rows} columns={columns} loading={loading} />

        {/* Render ModalDelete component */}
        <ModalDelete
          id={selectedTransactionId}
          onDeleteComponent={(id) => {
            // Implement deletion logic here
            console.log(`Deleting transaction with ID: ${id}`);
            setDeleteModalOpen(false); // Close the delete modal
          }}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)} // Close the delete modal
        />
      </main>
    </Layout>
  );
}
