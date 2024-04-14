import Layout from "../../../components/layouts/OperasionalLayout";
import CustomerListCard from "../../../components/cards/CustomerListCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
export default function Home() {
  const [customerData, setCustomerData] = useState([]);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/customer/all`
      );
      const data = response.data;
      setCustomerData(data.data);
      setTotalCustomer(data.total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    navigate(`/operasional/transaction/out/form`);
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
                  Customers
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div className="pb-3 flex justify-between">
          <div>
            <h1 className="text-3xl pb-1  font-medium">Customers List</h1>
            <p>
              Total Customer :{" "}
              {loading ? (
                <ClipLoader size={10} color="#422AFB" loading={loading} />
              ) : (
                totalCustomer
              )}
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCreateClick}
              className="bg-brand-500 flex  items-center hover:bg-brand-800 text-white font-bold p-3 rounded-full"
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

        {loading ? (
          <div className="flex justify-center items-center mt-6">
            <ClipLoader size={40} color="#422AFB" loading={loading} />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {customerData?.map((customer, index) => (
              <CustomerListCard key={index} customer={customer} />
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}
