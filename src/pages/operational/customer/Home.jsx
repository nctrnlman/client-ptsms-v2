import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "../../../components/tables/DataTable";
import Layout from "../../../components/layouts/OperasionalLayout";
import ModalAddCustomer from "./components/ModalAddCustomer";
import ModalEditCustomer from "./components/ModalEditCustomer";
import ModalDelete from "../../../components/cards/ModalDelete";
// import { ClipLoader } from "react-spinners";
// import CustomerListCard from "../../../components/cards/CustomerListCard";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);

  // const [customerData, setCustomerData] = useState([]);
  // const [totalCustomer, setTotalCustomer] = useState(0);

  //Datatable Column

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "customer_name", headerName: "Customer Name" },
    {
      field: "action",
      headerName: "Action",

      renderCell: (params) => (
        <div className="flex gap-3 ">
          <button
            className=" text-brand-500  hover:text-brand-800 font-bold"
            onClick={() => handleEditClick(params.row.customer_id)}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:text-red-800 font-bold"
            onClick={() => handleDeleteClick(params.row.customer_id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // handle modal

  const handleEditClick = (id) => {
    setSelectedProductId(id);
    setOpenModalEdit(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setOpenModalDelete(true);
  };

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  // logic

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/customers`
      );
      const modifiedData = response.data.data.customers.map((item, index) => ({
        id: index + 1,
        customer_id: item.customer_id,
        customer_name: item.customer_name,
      }));

      setRows(modifiedData);

      // setCustomerData(data.data);
      // setTotalCustomer(data.total);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setLoading(false);
    }
  };

  const handleCreateCustomer = async (newCustomer) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/customers`,
        {
          customerName: newCustomer.name,
        }
      );
      toast.success(response.data.message);
      await fetchData();
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (error) => error.message
        );
        toast.error(errorMessages.join(", "));
      } else {
        toast.error(error.response.data.message || "Failed to create customer");
      }
      toast.error(error.response.data.message);
      console.error("Error creating distributor:", error);
      setLoading(false);
    }
  };

  const updateCustomer = async (id, newData) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/customers/${id}`,
        {
          customerName: newData.name,
        }
      );
      toast.success(response.data.message);
      await fetchData();
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (error) => error.message
        );
        toast.error(errorMessages.join(", "));
      } else {
        toast.error(error.response.data.message || "Failed to create customer");
      }
      console.error("Error updating customer:", error);
      setLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/customers/${id}`
      );
      toast.success(response.data.message);
      await fetchData();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error deleting distributor:", error);
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
                href="/operasional/dashboard"
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
                  Customers
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div className="pb-3 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl pb-1 font-medium">Customers List</h1>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={handleToggleModal}
              className="flex items-center text-white bg-teal-500 hover:bg-teal-800 font-bold p-3 border rounded-full "
            >
              Add Customer
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
        <div className="">
          <DataTable rows={rows} columns={columns} loading={loading} />
        </div>
        {/* {loading ? (
          <div className="flex justify-center items-center mt-6">
            <ClipLoader size={40} color="#422AFB" loading={loading} />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {customerData?.map((customer, index) => (
              <CustomerListCard
                key={index}
                customer={customer}
                setOpenModalEdit={setOpenModalEdit}
                setOpenModalDelete={setOpenModalDelete}
                setSelectedProductId={setSelectedProductId}
              />
            ))}
          </div>
        )} */}
        <ModalAddCustomer
          openModal={openModal}
          setOpenModal={setOpenModal}
          onCreateCustomer={handleCreateCustomer}
        />
        <ModalEditCustomer
          id={selectedProductId}
          openModal={openModalEdit}
          setOpenModal={setOpenModalEdit}
          onUpdateCustomer={updateCustomer}
        />
        <ModalDelete
          id={selectedProductId}
          onDeleteComponent={deleteCustomer}
          open={openModalDelete}
          onClose={() => setOpenModalDelete(false)}
        />
      </main>
    </Layout>
  );
}
