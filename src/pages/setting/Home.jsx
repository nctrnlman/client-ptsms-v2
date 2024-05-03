import Layout from "../../components/layouts/SettingLayout";
import DataTable from "../../components/tables/DataTable";
import axios from "axios";
import { useState, useEffect } from "react";
import ModalAddUser from "../../components/cards/ModalAddUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalEditUser from "../../components/cards/ModalEditUser";
import ModalDelete from "../../components/cards/ModalDelete";
import ModalResetPasswordUser from "../../components/cards/ModalResetPasswordUser";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalReset, setOpenModalReset] = useState(false);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role_name", headerName: "Role", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3 ">
          <button
            className=" text-brand-500  hover:text-brand-800 font-bold"
            onClick={() => handleToggleModalEdit(params.row.user_id)}
          >
            Edit
          </button>

          <button
            className=" text-red-500 hover:text-red-800 font-bold "
            onClick={() => handleToggleModalDelete(params.row.user_id)}
          >
            Delete
          </button>
          <button
            className=" text-teal-500  hover:text-teal-800 font-bold"
            onClick={() => handleToggleModalReset(params.row.user_id)}
          >
            Reset Password
          </button>
        </div>
      ),
    },
  ];

  const handleToggleModalDelete = (id) => {
    setSelectedId(id);
    setOpenModalDelete(true);
  };
  const handleToggleModalEdit = (id) => {
    setSelectedId(id);
    setOpenModalEdit(!openModalEdit);
  };
  const handleToggleModalReset = (id) => {
    setSelectedId(id);
    setOpenModalReset(!openModalReset);
  };
  const handleDeleteUser = async (id) => {
    try {
      setLoading(true);

      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/user/delete/${id}`
      );
      toast.success(response.data.message);
      await fetchData();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error deleting sales:", error);
      setLoading(false);
    }
  };
  const updateUser = async (id, newData) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/auth/user/update`,
        {
          user_id: id,
          name: newData.username,
          email: newData.email,
          role_id: newData.role_id,
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
        toast.error(error.response.data.message);
      }
      console.error("Error updating sales:", error);
      setLoading(false);
    }
  };
  const resetPasswordUser = async (id, newData) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/auth/user/reset/password`,
        {
          id: id,
          password: newData.password,
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
        toast.error(error.response.data.message);
      }
      console.error("Error updating sales:", error);
      setLoading(false);
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/auth/user/all`
      );
      const modifiedData = response.data.data.map((item, index) => ({
        id: index + 1,
        user_id: item.user_id,
        name: item.name,
        email: item.email,
        role_name: item.role_name,
      }));
      setRows(modifiedData);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleCreateUser = async (newUser) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          name: newUser.username,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role_id,
        }
      );
      toast.success(response.data.message);
      await fetchData();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error creating User:", error);
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
                  Dashboard
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col sm:flex-row justify-between">
          <h1 className="text-3xl pb-3 font-medium">
            Setting User Dashboard Page
          </h1>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleToggleModal}
              className="bg-teal-500 flex  items-center hover:bg-teal-800 text-white font-bold p-4 rounded-full"
            >
              Add User Account
              <svg
                className="-mr-1 ml-2 h-4 w-4 "
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

        <DataTable rows={rows} columns={columns} loading={loading} />

        <ModalAddUser
          openModal={openModal}
          setOpenModal={setOpenModal}
          onCreateUser={handleCreateUser}
        />
        <ModalDelete
          id={selectedId}
          onDeleteComponent={handleDeleteUser}
          open={openModalDelete}
          onClose={() => setOpenModalDelete(false)}
        />
        <ModalEditUser
          id={selectedId}
          openModal={openModalEdit}
          setOpenModal={setOpenModalEdit}
          onUpdateUser={updateUser}
        />
        <ModalResetPasswordUser
          id={selectedId}
          openModal={openModalReset}
          setOpenModal={setOpenModalReset}
          onResetPasswordUser={resetPasswordUser}
        />
      </main>
    </Layout>
  );
}
