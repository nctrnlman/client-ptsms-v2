import Layout from "../../../components/layouts/OperasionalLayout";
import { Datepicker } from "flowbite-react";
import Repeater from "../../../components/form/Repeater";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
export default function SupplierForm() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const getMasterDynamic = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/supplier/master-dynamic`
      );
      setOptions(response.data.data.supplier);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching options:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getMasterDynamic();
  }, []);

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };

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
                  Supplier
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
                  Form
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div>
          <h1 className="text-3xl pb-3 font-medium">Supplier Create Form</h1>
          <p>
            Please use this form carefully to ensure the accuracy and
            completeness of the data. Every piece of information entered will
            aid in tracking and managing inventory more efficiently.
          </p>
        </div>

        <div className=" flex flex-col gap-6">
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="no_faktur"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                No Faktur
              </label>
              <input
                type="text"
                id="no_faktur"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="No Faktur"
                required
              />
            </div>
            <div>
              <label
                htmlFor="akl_akd"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                No AKL/AKD
              </label>
              <input
                type="text"
                id="akl_akd"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="No AKL/AKD"
                required
              />
            </div>
            <div>
              <label
                htmlFor="supplier"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Supplier{" "}
                {loading && (
                  <ClipLoader color="#4A90E2" loading={loading} size={10} />
                )}
              </label>

              <select
                id="supplier"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedSupplier}
                onChange={handleSupplierChange}
                disabled={loading}
              >
                <option value="">Choose a supplier</option>
                {!loading &&
                  options?.map((option) => (
                    <option key={option.supplier_id} value={option.supplier_id}>
                      {option.supplier_code + "-" + option.supplier_name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="payment_method"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Payment Method
              </label>
              <select
                id="payment_method"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Choose a payment method</option>
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
              </select>
            </div>

            <div>
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Created Date
              </label>
              <Datepicker
                title="Created Date"
                language="en"
                labelTodayButton="Today"
                labelClearButton="Clear"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Deadline
              </label>
              <Datepicker
                title="Deadline Date"
                language="en"
                labelTodayButton="Today"
                labelClearButton="Clear"
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product List
            </label>
            <Repeater />
          </div>

          <div className="flex justify-end mt-4">
            <button className="bg-brand-500 flex  items-center hover:bg-brand-800 text-white font-bold py-2 px-4 rounded-2xl">
              Submit
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
