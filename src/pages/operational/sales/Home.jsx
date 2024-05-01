import { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardCard from "../../../components/cards/DashboardCard";
import Layout from "../../../components/layouts/OperasionalLayout";
import DataTable from "../../../components/tables/DataTable";
import ModalDelete from "../../../components/cards/ModalDelete";
import ModalEditSales from "../../../components/cards/ModalEditSales";
import ModalAddSales from "../../../components/cards/ModalAddSales";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSales, setTotalSales] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "sales_name", headerName: "Sales Name", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3 ">
          <button
            className=" text-brand-500  hover:text-brand-800 font-bold"
            onClick={() => handleToggleModalEdit(params.row.sales_id)}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:text-red-800 font-bold"
            onClick={() => handleToggleModalDelete(params.row.sales_id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const handleToggleModalDelete = (id) => {
    setSelectedDistributorId(id);
    setOpenModalDelete(true);
  };
  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleToggleModalEdit = (id) => {
    setSelectedDistributorId(id);
    setOpenModalEdit(!openModalEdit);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/sales/all`
      );
      const modifiedData = response.data.data.map((item, index) => ({
        id: index + 1,
        sales_id: item.sales_id,
        sales_name: item.sales_name,
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
        `${import.meta.env.VITE_API_BASE_URL}/sales/master`
      );
      setTotalSales(response.data.data.totalSales);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDeleteSales = async (id) => {
    try {
      setLoading(true);

      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/sales/delete/${id}`
      );
      toast.success(response.data.message);
      await fetchData();
      await fetchMasterData();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error deleting sales:", error);
      setLoading(false);
    }
  };

  const handleCreateSales = async (newSales) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/sales/create`,
        {
          salesName: newSales.name,
        }
      );
      toast.success(response.data.message);
      await fetchData();
      await fetchMasterData();
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (error) => error.message
        );
        toast.error(errorMessages.join(", "));
      } else {
        toast.error(error.response.data.message || "Failed to create product");
      }
      console.error("Error creating distributor:", error);
      setLoading(false);
    }
  };

  const updateSales = async (id, newData) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/sales/update/${id}`,
        {
          salesName: newData.name,
        }
      );
      toast.success(response.data.message);
      await fetchData();
      await fetchMasterData();
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (error) => error.message
        );
        toast.error(errorMessages.join(", "));
      } else {
        toast.error(error.response.data.message || "Failed to create product");
      }
      console.error("Error updating sales:", error);
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
                  Sales
                </a>
              </div>
            </li>
          </ol>
        </nav>
        <div className="flex justify-between">
          <h1 className="text-3xl pb-3 font-medium">Sales Dashboard Page</h1>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleToggleModal}
              className="flex items-center text-white hover:bg-teal-800 font-bold p-3 border bg-teal-500 rounded-full "
            >
              Add Sales
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
        <div className="flex gap-6 ">
          <DashboardCard
            title="Total Sales"
            description={totalSales}
            icon={FaUsers}
          />
        </div>
        <DataTable rows={rows} columns={columns} loading={loading} />
        <ModalAddSales
          openModal={openModal}
          setOpenModal={setOpenModal}
          onCreateSales={handleCreateSales}
        />
        <ModalDelete
          id={selectedDistributorId}
          onDeleteComponent={handleDeleteSales}
          open={openModalDelete}
          onClose={() => setOpenModalDelete(false)}
        />
        <ModalEditSales
          id={selectedDistributorId}
          openModal={openModalEdit}
          setOpenModal={setOpenModalEdit}
          onUpdateSales={updateSales}
        />
      </main>
    </Layout>
  );
}
