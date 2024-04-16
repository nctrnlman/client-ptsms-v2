import { useRef, useState, useEffect } from "react";
import {
  Button,
  Label,
  Modal,
  Select,
  TextInput,
  Datepicker,
} from "flowbite-react";
import axios from "axios";

function ModalAddProduct({ openModal, setOpenModal, onCreateProduct }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [aklAkd, setAklAkd] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState([]);
  const [productMerk, setProductMerk] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedProductMerk, setSelectedProductMerk] = useState("");

  const productNameInputRef = useRef(null);

  const getMasterDynamic = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/data/master/transaction`
      );
      setProductType(response.data.data.productType);
      setProductMerk(response.data.data.productMerk);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching options:", error);
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setProductName("");
    setAklAkd("");
    setExpiredDate("");
    setPrice("");
    setStock("");
  };

  const handleCreateProduct = () => {
    onCreateProduct({
      name: productName,
      aklAkd: aklAkd,
      expiredDate: expiredDate,
      price: price,
      stock: stock,
      productType: selectedProductType,
      productMerk: selectedProductMerk,
    });
    handleCloseModal();
  };

  useEffect(() => {
    getMasterDynamic();
  }, []);

  return (
    <Modal
      show={openModal}
      size="xl"
      popup
      onClose={handleCloseModal}
      initialFocus={productNameInputRef}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Add New Product
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productName" value="Product Name" />
            </div>
            <TextInput
              id="productName"
              ref={productNameInputRef}
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productType" value="Product Type" />
            </div>
            <Select
              id="productType"
              value={selectedProductType}
              onChange={(e) => setSelectedProductType(e.target.value)}
            >
              <option value="">Choose Product type</option>
              {productType.map((type) => (
                <option key={type.product_type_id} value={type.product_type_id}>
                  {type.type_name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productMerk" value="Product Merk" />
            </div>
            <Select
              id="productMerk"
              value={selectedProductMerk}
              onChange={(e) => setSelectedProductMerk(e.target.value)}
            >
              <option value="">Choose Product Merk</option>
              {productMerk.map((merk) => (
                <option key={merk.product_merk_id} value={merk.product_merk_id}>
                  {merk.merk_name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="akl_akd" value="N0 AKL/AKD" />
            </div>
            <TextInput
              id="akl_akd"
              placeholder="Enter akl/akd"
              value={aklAkd}
              onChange={(e) => setAklAkd(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="expiredDate" value="Expired Date" />
            </div>
            <Datepicker
              id="expiredDate"
              name="expiredDate"
              // selected={formData.timeToPayment}
              value={expiredDate}
              onSelectedDateChanged={(date) => setExpiredDate(date)}
              title="Expired Date"
              language="en"
              labelTodayButton="Today"
              labelClearButton="Clear"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" />
            </div>
            <TextInput
              id="price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="stock" value="Stock" />
            </div>
            <TextInput
              id="stock"
              type="number"
              placeholder="Enter stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={handleCreateProduct} className="bg-brand-500">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddProduct;
