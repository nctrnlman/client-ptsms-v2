import Layout from "../../../components/layouts/OperasionalLayout";
import { Datepicker } from "flowbite-react";
import TransactionOutRepeater from "../../../components/form/TransactionOutRepeater";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { decryptNumber, encryptNumber } from "../../../utils/encryptionUtils";
import { formatCurrency, removeCurrencyFormat } from "../../../utils/converter";
export default function TransactionOutEdit() {
  const { id } = useParams();
  const [customerId, setCustomerId] = useState(0);
  const [product, setProduct] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [salesman, setSalesman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [totalTransactionTax, setTotalTransactionTax] = useState(0);
  const [productLength, setProductLength] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  const [errors, setErrors] = useState({
    noFaktur: "",
    noPo: "",
    customerId: "",
    paymentMethod: "",
    timeToPayment: "",
    deliveryDate: "",
  });

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/transactions/out/update/${decryptNumber(id)}`,
        {
          ...formData,
          totalTransaction: totalTransaction,
          productList: formData.productList.map((product) => ({
            ...product,
            price: removeCurrencyFormat(product.price),
            cn: removeCurrencyFormat(product.cn),
            productTotalPrice: parseInt(product.productTotalPrice),
          })),
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
      navigate(
        `/operasional/customer/transaction/detail/${encryptNumber(customerId)}`
      );
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (error) => error.message
        );
        toast.error(errorMessages.join(", "));
        setErrors({
          // noFaktur:
          //   error.response.data.errors.find(
          //     (error) => error.field === "noFaktur"
          //   )?.message || "",
          // noPo:
          //   error.response.data.errors.find((error) => error.field === "noPo")
          //     ?.message || "",
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

  const getTransactionDetail = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/out/detail/${id}`
      );

      const transactionDetail = response.data.data;
      const formattedDateTP = new Date(
        transactionDetail.transactionOut.time_to_payment
      ).toLocaleDateString("en-CA");
      const formattedDateDT = new Date(
        transactionDetail.transactionOut.delivery_date
      ).toLocaleDateString("en-CA");
      setFormData({
        ...formData,
        noFaktur: transactionDetail.transactionOut.no_faktur || "",
        noPo: transactionDetail.transactionOut.no_po || "",
        customerId: transactionDetail.transactionOut.customer_id || "",
        salesman: transactionDetail.transactionOut.salesman || "",
        paymentMethod: transactionDetail.transactionOut.payment_method || "",
        timeToPayment: formattedDateTP || "",
        deliveryDate: formattedDateDT || "",
        note: transactionDetail.transactionOut.note || "",
        productList: transactionDetail.transactionOutDetail || [],
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching options:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setCustomerId(decryptNumber(id));
    getMasterDynamic();
    // calculateTotalTransaction();
    getTransactionDetail(decryptNumber(id));
  }, []);

  useEffect(() => {
    const calculateTotalTransaction = () => {
      const total = formData.productList.reduce((sum, product) => {
        console.log(product.productTotalPrice);
        return sum + parseInt(product.productTotalPrice);
      }, 0);
      setTotalTransaction(total);
    };

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
                  Transaction Out Edit
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div>
          <h1 className="text-3xl pb-3 font-medium">
            Transaction Out Edit Form
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
                No Faktur
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
              {/* {errors.noFaktur && (
                <p className="text-red-500 text-sm pt-2">{errors.noFaktur}</p>
              )} */}
            </div>
            {/* No PO */}
            <div>
              <label
                htmlFor="no_po"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                No PO
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
              {/* {errors.noPo && (
                <p className="text-red-500 text-sm pt-2">{errors.noPo}</p>
              )} */}
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
              <Select
                id="customer"
                value={
                  formData.customerId
                    ? {
                        value: formData.customerId,
                        label: customer.find(
                          (option) => option.customer_id === formData.customerId
                        )?.customer_name,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    customerId: selectedOption ? selectedOption.value : "",
                  })
                }
                options={customer.map((option) => ({
                  value: option.customer_id,
                  label: option.customer_name,
                }))}
                placeholder="Choose a Customer"
                isClearable
                isDisabled={loading}
              />
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
                Salesman{" "}
                {loading && (
                  <ClipLoader color="#4A90E2" loading={loading} size={10} />
                )}
              </label>

              <Select
                id="salesman"
                value={
                  formData.salesman
                    ? {
                        value: formData.salesman,
                        label: salesman.find(
                          (option) => option.sales_id === formData.salesman
                        )?.sales_name,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    salesman: selectedOption ? selectedOption.value : "",
                  })
                }
                options={salesman.map((option) => ({
                  value: option.sales_id,
                  label: option.sales_name,
                }))}
                placeholder="Choose a Salesman"
                isClearable
                isDisabled={loading}
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
            </div>
            {/* Delivery Date */}
            <div>
              <label
                htmlFor="deliveryDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Delivery Date
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
              formData={formData}
            />
            {errors.productList && (
              <p className="text-red-500 text-sm pt-2">{errors.productList}</p>
            )}
          </div>

          <div className="flex items-center justify-end mt-10 gap-4">
            <p>Total Transaction : {formatCurrency(totalTransaction)}</p>
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
