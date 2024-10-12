import { useState, useEffect } from "react";
import { Datepicker } from "flowbite-react";
import Select from "react-select";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Repeater from "../../../components/form/Repeater";
import { decryptNumber, encryptNumber } from "../../../utils/encryptionUtils";
import Layout from "../../../components/layouts/OperasionalLayout";
import { formatCurrency } from "../../../utils/converter";

export default function TransactionInEdit() {
  const { id } = useParams();
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    noKita: "",
    noFaktur: "",
    supplierId: "",
    paymentMethod: "",
    timeToPayment: "",
    tax: "",
    note: "",
    shippingCost: "",
    productList: [],
  });

  const getMasterDynamic = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/suppliers/master-dynamic`
      );

      setSupplierOptions(response.data.data.suppliers);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching options:", error);
      setLoading(false);
    }
  };

  const getMasterDynamicProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/products/supplier/${id}`
      );

      setProduct(response.data.data.product);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching options:", error);
      setLoading(false);
    }
  };

  const getTransactionDetail = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/in/${id}`
      );

      const transactionDetail = response.data.data;
      const formattedDate = new Date(
        transactionDetail.transactionIn.time_to_payment
      ).toLocaleDateString("en-CA");
      // setSelectedSupplier(transactionDetail.transactionIn.supplier_id);
      setFormData({
        ...formData,
        noKita: transactionDetail.transactionIn.no_kita || "",
        noFaktur: transactionDetail.transactionIn.no_faktur || "",
        noPo: transactionDetail.transactionIn.no_po || "",
        supplierId: transactionDetail.transactionIn.supplier_id || "",
        paymentMethod: transactionDetail.transactionIn.payment_method || "",
        timeToPayment: formattedDate || "",
        tax: transactionDetail.transactionIn.tax || "",
        note: transactionDetail.transactionIn.note || "",
        shippingCost: transactionDetail.transactionIn.shipping_cost
          ? formatCurrency(transactionDetail.transactionIn.shipping_cost)
          : "",
        productList: response.data.data.transactionInDetail || [],
      });
      if (transactionDetail.transactionIn?.supplier_id) {
        getMasterDynamicProduct(transactionDetail.transactionIn.supplier_id);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMasterDynamic();
    getTransactionDetail(decryptNumber(id));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let filteredValue = value;

    if (name === "supplierId") {
      getMasterDynamicProduct(value);
    }

    if (name === "tax") {
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
    if (name === "shippingCost") {
      filteredValue = value.replace(/[^0-9]/g, "");
      setFormData({
        ...formData,
        [name]: formatCurrency(filteredValue),
      });
    } else {
      setFormData({
        ...formData,
        [name]: filteredValue,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formattedProductList = formData.productList.map((item) => ({
        ...item,
        product_price: item.product_price
          ? item.product_price.toString().replace(/[^\d]/g, "")
          : "",
        product_discount: item.product_discount
          ? parseFloat(item.product_discount)
          : "",
      }));

      const submissionData = {
        ...formData,
        shippingCost: formData.shippingCost.replace(/[^\d]/g, ""),
        productList: formattedProductList,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/in/${decryptNumber(
          id
        )}`,
        submissionData
      );

      setFormData({
        noKita: "",
        noFaktur: "",
        supplierId: "",
        paymentMethod: "",
        timeToPayment: "",
        tax: "",
        note: "",
        shippingCost: "",
        productList: [],
      });

      toast.success(response.data.message);
      navigate(`/operasional/suppliers`);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
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
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-teal-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Transaction In
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
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-teal-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Edit
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div>
          <h1 className="text-3xl pb-3 font-medium">
            Transaction In Edit Form
          </h1>
          <p>
            Please use this form carefully to ensure the accuracy and
            completeness of the data. Every piece of information entered will
            aid in tracking and managing inventory more efficiently.
          </p>
        </div>

        <div className=" flex flex-col gap-6">
          <h4 className="pt-3 block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Transaction Information
          </h4>
          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* No Kita */}
            <div>
              <label
                htmlFor="no_kita"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                No Kita <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="no_kita"
                name="noKita"
                value={formData.noKita}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                placeholder="No Kita"
                required
                // disabled
              />
            </div>
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
                value={formData.noFaktur || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                placeholder="No Faktur"
                required
              />
            </div>
            {/* Supplier */}
            <div>
              <label
                htmlFor="supplier"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Supplier<span className="text-red-500">*</span>
                {loading && (
                  <ClipLoader color="#4A90E2" loading={loading} size={10} />
                )}
              </label>

              <Select
                id="supplier"
                name="supplierId"
                value={
                  formData.supplierId
                    ? {
                        value: formData.supplierId,
                        label: supplierOptions.find(
                          (option) => option.supplier_id === formData.supplierId
                        )?.supplier_name,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "supplierId",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                options={supplierOptions.map((option) => ({
                  value: option.supplier_id,
                  label: option.supplier_code + "-" + option.supplier_name,
                }))}
                placeholder="Choose a supplier"
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
                value={formData.paymentMethod || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
              >
                <option value="">Choose a payment method</option>
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
              </select>
            </div>
            {/* Tax */}
            <div>
              <label
                htmlFor="tax"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tax (%)
              </label>
              <input
                type="text"
                id="tax"
                name="tax"
                value={formData.tax || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                placeholder="Tax"
                pattern="^\d+(\.\d+)?$"
                title="Enter a valid number"
                required
              />
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
                value={formData.timeToPayment || ""}
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
            </div>

            {/* Shipping Cost */}
            <div>
              <label
                htmlFor="shippingCost"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Shipping Cost
              </label>
              <input
                type="text"
                id="shippingCost"
                name="shippingCost"
                value={formData.shippingCost}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                placeholder="Rp 0"
                pattern="^\d+(\.\d+)?$"
                title="Enter a valid number"
                required
              />
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
              value={formData.note || ""}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
              placeholder="Insert Note here.."
              required
            />
          </div>

          {/* Product List */}
          <div className="pt-3 ">
            <label
              htmlFor=""
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Product Information
              {loading && (
                <ClipLoader color="#4A90E2" loading={loading} size={10} />
              )}
            </label>
            <Repeater
              product={product}
              setProduct={setFormData}
              formData={formData ? formData : []}
            />
          </div>

          <div className="flex justify-end mt-4">
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
