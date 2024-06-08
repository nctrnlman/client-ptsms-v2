import { useRef, useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import axios from "axios";
import DataTable from "../tables/DataTable";
import { formatDate } from "../../../src/utils/converter";

function ModalExpiredDetail({ id, open, onClose }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalStock, setTotalStock] = useState(0);
  const [productName, setProductName] = useState("Product");
  const columns = [
    { field: "id", headerName: "No", flex: 1 },
    { field: "expired_date", headerName: "Expired Date", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
  ];
  const productNameInputRef = useRef(null);

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/expired/detail/${id}`
      );
      const modifiedData = response.data.data.map((item, index) => ({
        id: index + 1,
        product_expired_id: item.product_expired_id,
        product_id: item.product_id,
        quantity: item.quantity,
        expired_date: formatDate(item.expired_date),
      }));
      setRows(modifiedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchMasterData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/detail/${id}`
      );
      setTotalStock(response.data.data.stock);
      setProductName(response.data.data.product_name);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData(id);
      fetchMasterData(id);
    }
  }, [open]);

  return (
    <Modal
      show={open}
      size="xl"
      popup
      onClose={onClose}
      initialFocus={productNameInputRef}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="flex flex-col pb-2">
          <h1 className="text-xl pb-2 font-medium">{productName}</h1>
          <p>total stock : {totalStock}</p>
        </div>
        <div className="space-y-6">
          <DataTable rows={rows} columns={columns} loading={loading} />
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end"></Modal.Footer>
    </Modal>
  );
}

export default ModalExpiredDetail;
