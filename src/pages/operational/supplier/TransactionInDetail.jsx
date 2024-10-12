import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { decryptNumber, encryptNumber } from "../../../utils/encryptionUtils";
import { formatDate, formatCurrency } from "../../../utils/converter";
import Layout from "../../../components/layouts/OperasionalLayout";
import DataTable from "../../../components/tables/DataTable";

export default function TransactionInDetail() {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionId, setTransactionId] = useState(0);
  const [distributor, setDistributor] = useState("");
  const [totalTransaction, setTotalTransaction] = useState("");
  const [totalTransactionTax, setTotalTransactionTax] = useState("");
  const [noKita, setNoKita] = useState("");
  const [noFaktur, setNoFaktur] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [note, setNote] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updateAt, setUpdateAt] = useState("");
  const userData = useSelector((state) => state.user.User);
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "product_name", headerName: "Product Name" },
    { field: "product_code", headerName: "Product Code" },
    { field: "type_name", headerName: "Type" },
    { field: "merk_name", headerName: "Merk" },
    { field: "expired_date", headerName: "Expired Date" },
    { field: "akl_akd", headerName: "No AKL/AKD" },
    { field: "batch_lot", headerName: "Batch/Lot" },
    { field: "price", headerName: "Price" },
    { field: "discount", headerName: "Discount (%)" },
    { field: "price_discount", headerName: "Discounted Price" },
    { field: "quantity", headerName: "Qty" },
  ];

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/in/${id}`
      );
      const modifiedData = response.data.data.transactionInDetail.map(
        (item, index) => ({
          id: index + 1,
          product_name: item.product_name || "-",
          product_code: item.product_code || "-",
          type_name: item.type_name || "-",
          merk_name: item.merk_name || "-",
          expired_date: item.expired_date ? formatDate(item.expired_date) : "-",
          akl_akd: item.akl_akd || "-",
          batch_lot: item.batch_lot || "-",
          price: item.price ? formatCurrency(item.price) : "-",
          price_discount: item.price_discount
            ? formatCurrency(item.price_discount)
            : "-",
          discount: item.discount ? item.discount + "%" : "-",
          quantity: item.quantity || "-",
        })
      );
      setRows(modifiedData);
      setDistributor(response.data.data.transactionIn.supplier_name);
      setTotalTransaction(response.data.data.transactionIn.amount);
      setTotalTransactionTax(response.data.data.transactionIn.amount_tax);
      setCreatedAt(formatDate(response.data.data.transactionIn.created_at));
      setUpdateAt(
        response.data.data.transactionIn.updated_at
          ? formatDate(response.data.data.transactionIn.updated_at)
          : "-"
      );
      setShippingCost(
        response.data.data.transactionIn.shipping_cost
          ? formatCurrency(response.data.data.transactionIn.shipping_cost)
          : "-"
      );
      setPaymentMethod(response.data.data.transactionIn.payment_method);
      setNote(response.data.data.transactionIn.note);
      setNoKita(response.data.data.transactionIn.no_kita);
      setNoFaktur(response.data.data.transactionIn.no_faktur);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    navigate(
      `/operasional/supplier/transaction/in/edit/${encryptNumber(
        transactionId
      )}`
    );
  };

  useEffect(() => {
    setTransactionId(decryptNumber(id));
    fetchData(decryptNumber(id));
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
                  Suppliers
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
                  Transaction
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
                  Detail{" "}
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col sm:flex-row justify-between">
          <h1 className="text-3xl pb-3 font-medium">
            Suppliers Transaction Detail
          </h1>
          {userData?.role_id == 1 && (
            <div className="flex justify-center gap-3">
              <button
                onClick={handleEditClick}
                className="bg-teal-500 flex  items-center hover:bg-teal-800 text-white font-bold p-3 rounded-full"
              >
                Edit Transaction
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
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <p className="font-medium">Distributor</p>
          <p>: {distributor || "-"}</p>
          <p className="font-medium">No Kita</p>
          <p>: {noKita || "-"}</p>
          <p className="font-medium">No Faktur</p>
          <p>: {noFaktur || "-"}</p>
          <p className="font-medium">Payment Method</p>
          <p>: {paymentMethod || "-"}</p>
          <p className="font-medium">Shipping Cost</p>
          <p>: {shippingCost || "-"}</p>
          <p className="font-medium">Created Date</p>
          <p>: {createdAt || "-"}</p>
          <p className="font-medium">Update Date</p>
          <p>: {updateAt || "-"}</p>
          <p className="font-medium">Total Transaction</p>
          <p>: {formatCurrency(totalTransaction) || "-"}</p>
          <p className="font-medium">Total Transaction with Tax</p>
          <p>: {formatCurrency(totalTransactionTax) || "-"}</p>
          <p className="font-medium">Note:</p>
          <p>: {note || "-"}</p>
        </div>

        <DataTable rows={rows} columns={columns} loading={loading} />
      </main>
    </Layout>
  );
}
