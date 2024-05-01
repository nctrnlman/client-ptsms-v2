import DashboardCard from "../../components/cards/DashboardCard";
import { FaBox, FaTruck, FaShoppingCart, FaExchangeAlt } from "react-icons/fa";
import Layout from "../../components/layouts/OperasionalLayout";
import TAChart from "../../components/chart/TAChart";
import IncomingTransactionsChart from "../../components/chart/IncomingTransactionsChart";
import OutgoingTransactionsChart from "../../components/chart/OutgoingTransactionsChart";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [transactionOut, setTransactionOut] = useState([]);
  const [transactionIn, setTransactionIn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalSupplier, setTotalSupplier] = useState(0);
  const [totalTransactionIn, setTotalTransactionIn] = useState(0);
  const [totalTransactionOut, settotalTransactionOut] = useState(0);
  const fetchDataTransaction = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/report`
      );
      setTransactionOut(response.data.data.transactionOut);
      setTransactionIn(response.data.data.transactionIn);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchCardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/data/operasional/dashboard`
      );
      setTotalProduct(response.data.data.totalProduct);
      setTotalSupplier(response.data.data.totalSupplier);
      setTotalTransactionIn(response.data.data.totalTransactionIn);
      settotalTransactionOut(response.data.data.totalTransactionOut);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCardData();
    fetchDataTransaction();
  }, []);

  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
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
                  Dashboard
                </a>
              </div>
            </li>
          </ol>
        </nav>
        <div>
          <h1 className="text-3xl pb-3 font-medium">Dashboard Page</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Products"
            description={totalProduct}
            icon={FaBox}
          />
          <DashboardCard
            title="Today Suppliers"
            description={totalSupplier}
            icon={FaTruck}
          />
          <DashboardCard
            title="Total Transaction In"
            description={totalTransactionIn}
            icon={FaShoppingCart}
          />
          <DashboardCard
            title="Total Transaction Out"
            description={totalTransactionOut}
            icon={FaExchangeAlt}
          />
        </div>
        <div className="mt-10 p-4 ">
          {/* <div>
            <h1 className="text-2xl pb-3 font-medium">Total Transaction </h1>
            <TAChart />
          </div> */}
          <div className="pb-5">
            <h1 className="text-2xl pb-10 font-medium">
              Transaction Incoming Report
            </h1>
            <IncomingTransactionsChart data={transactionIn} />
          </div>
          <div>
            <h1 className="text-2xl pb-10 font-medium">
              Transaction Outgoing Report
            </h1>
            <OutgoingTransactionsChart data={transactionOut} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
