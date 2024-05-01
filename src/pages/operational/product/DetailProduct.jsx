import Layout from "../../../components/layouts/OperasionalLayout";
import DashboardCard from "../../../components/cards/DashboardCard";
import { FaCalendarDay, FaClipboardList } from "react-icons/fa";
import DataTable from "../../../components/tables/DataTable";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, formatCurrency } from "../../../utils/converter";
import { decryptNumber, encryptNumber } from "../../../utils/encryptionUtils";
import ModalDelete from "../../../components/cards/ModalDelete";

export default function DetailProduct() {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [customerId, setCustomerId] = useState(0);
  const [todayTransaction, setTodayTransaction] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [productName, setProductName] = useState("Product");
  const [loading, setLoading] = useState(true);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "No", flex: 1 },
    { field: "expired_date", headerName: "Expired Date", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3 ">
          <button
            className=" text-brand-500  hover:text-brand-800 font-bold"
            onClick={() => handleEdit(params.row.product_expired_id)}
          >
            Edit
          </button>
          <button
            className=" text-red-500 hover:text-red-800 font-bold "
            onClick={() => handleDelete(params.row.product_expired_id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    setSelectedTransactionId(id);
    setDeleteModalOpen(true);
  };

  const handleEdit = (id) => {
    navigate(`/operasional/customer/transaction/detail/${encryptNumber(id)}`);
  };

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/expired/detail/${id}`
      );
      const modifiedData = response.data.data.map((item, index) => ({
        id: index + 1,
        product_expired_id: item.product_expired_id,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        expired_date: formatDate(item.expired_date),
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
        `${import.meta.env.VITE_API_BASE_URL}/product/detail/${id}`
      );
      setTotalStock(response.data.data.stock);
      setProductName(response.data.data.product_name);
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
                  Product
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
                  Detail
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col">
          <h1 className="text-3xl pb-3 font-medium">
            {productName} Expired Detail
          </h1>
          <p>total stock : {totalStock}</p>
        </div>
        <DataTable rows={rows} columns={columns} loading={loading} />

        <ModalDelete
          id={selectedTransactionId}
          onDeleteComponent={(id) => {
            console.log(`Deleting transaction with ID: ${id}`);
            setDeleteModalOpen(false);
          }}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      </main>
    </Layout>
  );
}
