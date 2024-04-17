import DashboardCard from "../../../components/cards/DashboardCard";
import { FaBox, FaCalendarDay, FaClipboardList, FaTags } from "react-icons/fa";
import Layout from "../../../components/layouts/OperasionalLayout";
import DataTable from "../../../components/tables/DataTable";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalAddProduct from "../../../components/cards/ModalAddProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDate, formatCurrency } from "../../../utils/converter";
import { encryptNumber } from "../../../utils/encryptionUtils";
import ModalDelete from "../../../components/cards/ModalDelete";
import ModalEdit from "../../../components/cards/ModalEditProduct";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalProductMerk, setTotalProductMerk] = useState(0);
  const [totalProductType, setTotalProductType] = useState(0);
  const [mostStockProduct, setMostStockProduct] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [openModalEdit, setOpenModalEdit] = useState(false); // tambahkan state untuk modal edit
  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "product_name", headerName: "Product Name", flex: 1 },
    { field: "product_type", headerName: "Product Type", flex: 1 },
    { field: "product_merk", headerName: "Product Merk", flex: 1 },
    { field: "akl_akd", headerName: "No AKL/AKD", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "stock", headerName: "Stock", flex: 1 },
    { field: "expired_date", headerName: "Expired Date", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3">
          <button
            className="text-brand-500 hover:text-teal-800 font-bold"
            onClick={() => handleEdit(params.row.product_id)}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:text-red-800 font-bold"
            onClick={() => handleToggleModalDelete(params.row.product_id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleToggleModalDelete = (id) => {
    setSelectedProductId(id);
    setOpenModalDelete(true);
  };
  const handleDeleteProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/product/delete/${id}`
      );
      toast.success(response.data.message);
      await fetchData();
      await fetchMasterData();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error deleting distributor:", error);
      setLoading(false);
    }
  };
  const handleEdit = (id) => {
    setSelectedProductId(id);
    setOpenModalEdit(true); // Buka modal edit saat tombol Edit ditekan
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/all`
      );
      const modifiedData = response.data.data.map((item, index) => ({
        id: index + 1,
        product_id: item.product_id,
        product_name: item.product_name,
        product_type: item.type_name,
        product_merk: item.merk_name,
        akl_akd: item.akl_akd,
        price: formatCurrency(item.price),
        stock: item.stock,
        expired_date: formatDate(item.expired_date),
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
        `${import.meta.env.VITE_API_BASE_URL}/product/master`
      );
      setTotalProduct(response.data.data.totalProduct);
      setTotalProductMerk(response.data.data.totalProductMerk);
      setTotalProductType(response.data.data.totalProductType);
      setMostStockProduct(response.data.data.mostStockProduct);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleCreateProduct = async (newProduct) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/products/create`,
        newProduct
      );
      toast.success(response.data.message);
      await fetchData();
      await fetchMasterData();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error creating product:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterData();
    fetchData();
  }, []);

  return (
    <Layout>
      <main className="flex flex-col gap-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 dark:text-gray-400 dark:hover:text-white"
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
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-teal-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Products
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between">
          <h1 className="text-3xl pb-3 font-medium">Products Dashboard</h1>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleToggleModal}
              className="flex items-center text-white bg-teal-500 hover:bg-teal-800 font-bold p-3 border rounded-full"
            >
              Add Product
              <svg
                className="-mr-1 ml-2 h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <DashboardCard
            title="Total Products"
            description={totalProduct}
            icon={FaBox}
          />
          <DashboardCard
            title="Today Product Merk"
            description={totalProductMerk}
            icon={FaCalendarDay}
          />
          <DashboardCard
            title="Total Product Type"
            description={totalProductType}
            icon={FaClipboardList}
          />
          <DashboardCard
            title="Most Stock Product"
            description={mostStockProduct}
            icon={FaTags}
          />
        </div>
        <DataTable rows={rows} columns={columns} loading={loading} />

        <ModalAddProduct
          openModal={openModal}
          setOpenModal={setOpenModal}
          onCreateProduct={handleCreateProduct}
        />
        <ModalDelete
          id={selectedProductId}
          onDeleteComponent={handleDeleteProduct}
          open={openModalDelete}
          onClose={() => setOpenModalDelete(false)}
        />
        <ModalEdit
          id={selectedProductId}
          onEditComponent={handleEdit}
          open={openModalEdit}
          onClose={() => setOpenModalEdit(false)}
        />
      </main>
    </Layout>
  );
}
