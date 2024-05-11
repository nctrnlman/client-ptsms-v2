import Layout from "../../../components/layouts/OperasionalLayout";
import { Datepicker } from "flowbite-react";
import TransactionOutRepeater from "../../../components/form/TransactionOutRepeater";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { decryptNumber, encryptNumber } from "../../../utils/encryptionUtils";
import { useSelector } from "react-redux";
export default function TransactionOutFrom() {
  const { id } = useParams();
  const [customerId, setCustomerId] = useState(0);
  const [product, setProduct] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [salesman, setSalesman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [totalTransactionTax, setTotalTransactionTax] = useState(0);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.User);
  const [formData, setFormData] = useState({
    noFaktur: "",
    noPo: "",
    cn: "",
    customerId: "",
    userId: userData.id,
    salesman: "",
    paymentMethod: "",
    timeToPayment: "",
    deliveryDate: "",
    note: "",
    productList: [],
  });
  const [errors, setErrors] = useState({
    noFaktur: "",
    noPo: "",
    customerId: "",
    paymentMethod: "",
    timeToPayment: "",
    deliveryDate: "",
  });

  const calculateTotalTransaction = () => {
    let total = 0;
    formData.productList.forEach((product) => {
      total += product.productPrice;
    });
    let totalWithTax = 0;
    formData.productList.forEach((product) => {
      totalWithTax += product.productTotalPrice;
    });
    setTotalTransaction(total);
    setTotalTransactionTax(totalWithTax);
  };

  const getMasterDynamic = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/data/master/transaction`
      );
      setProduct(response.data.data.product);
      setCustomer(response.data.data.customer);
      setSalesman(response.data.data.salesman);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching options:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let filteredValue = value;
    if (name === "cn") {
      filteredValue = value.replace(/[^0-9.]/g, "");
      const decimalIndex = filteredValue.indexOf(".");
      if (decimalIndex !== -1) {
        const integerPart = filteredValue.slice(0, decimalIndex);
        const decimalPart = filteredValue.slice(
          decimalIndex + 1,
          decimalIndex + 3
        );
        filteredValue = `${integerPart}.${decimalPart}`;
      }
    }
    setFormData({
      ...formData,
      [name]: filteredValue,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/out/create`,
        {
          ...formData,
          totalPayment: totalTransaction,
          totalPaymentTax: totalTransactionTax,
        }
      );
      setFormData({
        noFaktur: "",
        noPo: "",
        customerId: "",
        salesman: "",
        paymentMethod: "",
        timeToPayment: "",
        deliveryDate: "",
        note: "",
        productList: [],
      });
      setTotalTransaction("");
      setTotalTransactionTax("");
      toast.success(response.data.message);
      navigate(`/operasional/customer/${encryptNumber(customerId)}`);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (error) => error.message
        );
        toast.error(errorMessages.join(", "));
        setErrors({
          noFaktur:
            error.response.data.errors.find(
              (error) => error.field === "noFaktur"
            )?.message || "",
          noPo:
            error.response.data.errors.find((error) => error.field === "noPo")
              ?.message || "",
          customerId:
            error.response.data.errors.find(
              (error) => error.field === "customerId"
            )?.message || "",
          paymentMethod:
            error.response.data.errors.find(
              (error) => error.field === "paymentMethod"
            )?.message || "",
          timeToPayment:
            error.response.data.errors.find(
              (error) => error.field === "timeToPayment"
            )?.message || "",
          deliveryDate:
            error.response.data.errors.find(
              (error) => error.field === "deliveryDate"
            )?.message || "",
          productList:
            error.response.data.errors.find(
              (error) => error.field === "productList"
            )?.message || "",
        });
      } else {
        toast.error(
          error.response.data.message ||
            "Error submitting form. Please try again."
        );
      }
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getMasterDynamic();
    setCustomerId(decryptNumber(id));
    setFormData({ ...formData, customerId: decryptNumber(id) });
    calculateTotalTransaction();
  }, [formData.productList]);

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
                  Customer
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
                  Transaction Out
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
          <h1 className="text-3xl pb-3 font-medium">
            Transaction Out Create Form
          </h1>
          <p>
            Please use this form carefully to ensure the accuracy and
            completeness of the data. Every piece of information entered will
            aid in tracking and managing inventory more efficiently.
          </p>
        </div>

        <div className=" flex flex-col gap-3">
          <h4 className="pt-3 block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Transaction Information
          </h4>
          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* No Faktur */}
            <div>
              <label
                htmlFor="no_faktur"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                No Faktur<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="no_faktur"
                name="noFaktur"
                value={formData.noFaktur}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="No Faktur"
                required
              />
              {errors.noFaktur && (
                <p className="text-red-500 text-sm pt-2">{errors.noFaktur}</p>
              )}
            </div>
            {/* No PO */}
            <div>
              <label
                htmlFor="no_po"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                No PO<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="no_po"
                name="noPo"
                value={formData.noPo}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="No PO"
                required
              />
              {errors.noPo && (
                <p className="text-red-500 text-sm pt-2">{errors.noPo}</p>
              )}
            </div>

            {/* Customer */}
            <div>
              <label
                htmlFor="customer"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Customer<span className="text-red-500">*</span>
                {loading && (
                  <ClipLoader color="#4A90E2" loading={loading} size={10} />
                )}
              </label>
              <select
                id="customer"
                name="customerId"
                value={formData.customerId}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={true}
              >
                <option value="">Choose a Customer</option>
                {!loading &&
                  customer?.map((option) => (
                    <option
                      key={option.customer_id}
                      value={parseInt(option.customer_id)}
                    >
                      {option.customer_name}
                    </option>
                  ))}
              </select>
              {errors.customerId && (
                <p className="text-red-500 text-sm pt-2">{errors.customerId}</p>
              )}
            </div>
            {/* Salesman */}
            <div>
              <label
                htmlFor="salesman"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Salesman
                {loading && (
                  <ClipLoader color="#4A90E2" loading={loading} size={10} />
                )}
              </label>
              <select
                id="salesman"
                name="salesman"
                value={formData.salesman}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={loading}
              >
                <option value="">Choose a Salesman</option>
                {!loading &&
                  salesman?.map((option) => (
                    <option
                      key={option.sales_id}
                      value={parseInt(option.sales_id)}
                    >
                      {option.sales_name}
                    </option>
                  ))}
              </select>
            </div>
            {/* CN */}
            <div>
              <label
                htmlFor="cn"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                CN
              </label>
              <input
                type="text"
                id="cn"
                name="cn"
                value={formData.cn}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="CN"
                pattern="^\d+(\.\d+)?$"
                title="Enter a valid number"
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <label
                htmlFor="payment_method"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Payment Method<span className="text-red-500">*</span>
              </label>
              <select
                id="payment_method"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Choose a payment method</option>
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm pt-2">
                  {errors.paymentMethod}
                </p>
              )}
            </div>
            {/* Delivery Date */}
            <div>
              <label
                htmlFor="deliveryDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Delivery Date<span className="text-red-500">*</span>
              </label>
              <Datepicker
                id="deliveryDate"
                name="timeToPayment"
                // selected={formData.timeToPayment}
                value={formData.deliveryDate}
                onSelectedDateChanged={(date) => {
                  const formattedDate = new Date(date).toLocaleDateString(
                    "en-CA"
                  );
                  setFormData({ ...formData, deliveryDate: formattedDate });
                }}
                title="Delivery Date"
                language="en"
                labelTodayButton="Today"
                labelClearButton="Clear"
              />
              {errors.deliveryDate && (
                <p className="text-red-500 text-sm pt-2">
                  {errors.deliveryDate}
                </p>
              )}
            </div>
            {/* Time to Payment */}
            <div>
              <label
                htmlFor="time_to_payment"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time to Payment<span className="text-red-500">*</span>
              </label>
              <Datepicker
                id="time_to_payment"
                name="timeToPayment"
                // selected={formData.timeToPayment}
                value={formData.timeToPayment}
                onSelectedDateChanged={(date) => {
                  const formattedDate = new Date(date).toLocaleDateString(
                    "en-CA"
                  );
                  setFormData({ ...formData, timeToPayment: formattedDate });
                }}
                title="Time to Payment"
                language="en"
                labelTodayButton="Today"
                labelClearButton="Clear"
              />
              {errors.timeToPayment && (
                <p className="text-red-500 text-sm pt-2">
                  {errors.timeToPayment}
                </p>
              )}
            </div>
          </div>

          {/* Note */}
          <div>
            <label
              htmlFor="note"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Note
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Insert Note here..."
              required
            />
          </div>

          {/* Product List */}
          <div className="pt-3 ">
            <label
              htmlFor=""
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Product Information{" "}
              {loading && (
                <ClipLoader color="#4A90E2" loading={loading} size={10} />
              )}
            </label>
            <TransactionOutRepeater
              product={product}
              setProduct={setFormData}
            />
            {errors.productList && (
              <p className="text-red-500 text-sm pt-2">{errors.productList}</p>
            )}
          </div>

          <div className="flex items-center justify-end mt-10 gap-4">
            {/* <p>Total Price: {formatCurrency(totalTransactionTax)}</p> */}
            <button
              onClick={handleSubmit}
              className="bg-teal-500 flex  items-center hover:bg-teal-800 text-white font-bold py-2 px-4 rounded-2xl"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={20} color={"#ffffff"} loading={loading} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
