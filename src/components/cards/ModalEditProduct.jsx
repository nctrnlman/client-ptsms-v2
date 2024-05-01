import { useRef, useState, useEffect } from "react";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import axios from "axios";

function ModalEditProduct({ id, open, onClose, onEditProduct }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [aklAkd, setAklAkd] = useState("");
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState([]);
  const [productMerk, setProductMerk] = useState([]);
  const [expired, setExpired] = useState("");
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

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/detail/${id}`
      );
      const productData = response.data.data;
      setProductName(productData.product_name);
      setPrice(productData.price);
      setStock(productData.stock);
      setExpired(productData.isExpired);
      setAklAkd(productData.akl_akd);
      setSelectedProductType(productData.product_type);
      setSelectedProductMerk(productData.product_merk);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      console.log(expired);
      onEditProduct(id, {
        name: productName,
        aklAkd: aklAkd,
        price: price,
        stock: stock,
        expired: expired,
        productType: selectedProductType,
        productMerk: selectedProductMerk,
      });
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    if (open) {
      getMasterDynamic();
      fetchProductData();
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
        <div className="space-y-6">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productName" value="Product Name" />
            </div>
            <TextInput
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              required={true}
              ref={productNameInputRef}
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
              required={true}
            >
              <option value="">Select product type</option>
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
              required={true}
            >
              <option value="">Select product merk</option>
              {productMerk.map((merk) => (
                <option key={merk.product_merk_id} value={merk.product_merk_id}>
                  {merk.merk_name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="aklAkd" value="No AKL/AKD" />
            </div>
            <TextInput
              id="aklAkd"
              type="text"
              value={aklAkd}
              onChange={(e) => setAklAkd(e.target.value)}
              placeholder="Enter AKL/AKD number"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" />
            </div>
            <TextInput
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productExpired" value="Product Expired" />
            </div>
            <Select
              id="productExpired"
              value={expired}
              onChange={(e) => setExpired(e.target.value)}
            >
              <option value="">Expired and Not Expired</option>
              <option value="1">Expired</option>
              <option value="0">Not Expired</option>
            </Select>
          </div>
          {expired === "0" && (
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
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button
          onClick={handleUpdateProduct}
          className="bg-teal-500 hover:bg-teal-800"
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditProduct;
