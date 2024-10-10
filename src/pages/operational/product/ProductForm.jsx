import Layout from "../../../components/layouts/OperasionalLayout";
import { Datepicker } from "flowbite-react";
import AddProductRepeater from "../../../components/form/AddProductRepeater";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { removeCurrencyFormat } from "../../../utils/converter";

export default function ProductForm() {
  const [product, setProduct] = useState([]);
  const [productType, setProductType] = useState([]);
  const [productMerk, setProductMerk] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [productTypeName, setProductTypeName] = useState("");
  const [productMerkName, setProductMerkName] = useState("");

  const [formData, setFormData] = useState({
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

  const handleCreateProductType = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/products/type`,
        { typeName: productTypeName }
      );

      toast.success(response.data.message);
      setLoading(false);
      setProductTypeName("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (error) => error.message
        );
        toast.error(errorMessages.join(", "));
        setErrors(
          error.response.data.errors.reduce(
            (acc, err) => ({
              ...acc,
              [err.field]: err.message,
            }),
            {}
          )
        );
      } else {
        toast.error(
          error.response.data.message || "Failed to create product type"
        );
      }
      console.error("Error creating product type:", error);
      setLoading(false);
    }
  };

  const handleCreateProductMerk = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/products/merk`,
        { merkName: productMerkName }
      );
      toast.success(response.data.message);
      setLoading(false);
      setProductMerkName("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (error) => error.message
        );
        toast.error(errorMessages.join(", "));
        setErrors(
          error.response.data.errors.reduce(
            (acc, err) => ({
              ...acc,
              [err.field]: err.message,
            }),
            {}
          )
        );
      } else {
        toast.error(
          error.response.data.message || "Failed to create product type"
        );
      }
      console.error("Error creating product type:", error);
      setLoading(false);
    }
  };

  const getMasterDynamic = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/data/master/transaction`
      );
      setProduct(response.data.data.product);
      setProductType(response.data.data.productType);
      setProductMerk(response.data.data.productMerk);
      setSupplier(response.data.data.supplier);
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
      const cleanedData = {
        ...formData,
        productList: formData.productList.map((product) => ({
          ...product,
          // price: removeCurrencyFormat(product.price),
        })),
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/products/bulk`,
        cleanedData
      );
      setFormData({
        productList: [],
      });
      toast.success(response.data.message);
      navigate(`/operasional/products`);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (error) => error.message
        );
        toast.error(errorMessages.join(", "));
        setErrors({
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
                  href="/operasional/products"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Products
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
                  All Product Form
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div>
          <h1 className="text-3xl pb-3 font-medium">All Product Form</h1>
          <p>
            Please use this form carefully to ensure the accuracy and
            completeness of the data. Every piece of information entered will
            aid in tracking and managing inventory more efficiently.
          </p>
        </div>

        <div className=" flex flex-col gap-3">
          {/* Form fields */}
          <div className="grid grid-cols-1  gap-2">
            <h4 className=" block  text-xl font-medium text-gray-900 dark:text-white">
              Product Type
            </h4>
            {/* Product Type */}
            <form
              action=""
              className="flex gap-3 items-end"
              onSubmit={handleCreateProductType}
            >
              <div className="flex flex-col">
                <label
                  htmlFor="product_type_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product type name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="product_type_name"
                  name="product_type_name"
                  value={productTypeName}
                  onChange={(e) => {
                    setProductTypeName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Type"
                  required
                />
              </div>

              <button
                className="bg-teal-500 hover:bg-teal-800 text-white font-bold px-4 py-2 rounded-2xl mt-auto"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={20} color={"#ffffff"} loading={loading} />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 pt-4 gap-2">
            <h4 className=" block text-xl font-medium text-gray-900 dark:text-white">
              Product Merk
            </h4>
            {/* Product Type */}
            <form
              action=""
              className="flex gap-3 items-end"
              onSubmit={handleCreateProductMerk}
            >
              <div className="flex flex-col">
                <label
                  htmlFor="product_merk_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product merk name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="product_merk_name"
                  name="product_merk_name"
                  value={productMerkName}
                  onChange={(e) => {
                    setProductMerkName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Merk"
                  required
                />
              </div>

              <button
                className="bg-teal-500 hover:bg-teal-800 text-white font-bold px-4 py-2 rounded-2xl mt-auto"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={20} color={"#ffffff"} loading={loading} />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="pt-6 ">
            <label
              htmlFor=""
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Product Information{" "}
              {loading && (
                <ClipLoader color="#4A90E2" loading={loading} size={10} />
              )}
            </label>
            <AddProductRepeater
              product={product}
              setProduct={setFormData}
              productMerk={productMerk}
              productType={productType}
              supplier={supplier}
              loading={loading}
            />
            {errors.productList && (
              <p className="text-red-500 text-sm pt-2">{errors.productList}</p>
            )}
          </div>

          <div className="flex items-center justify-end mt-10 gap-4">
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
