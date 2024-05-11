import React, { useRef, useState, useEffect } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import Select from "react-select";
import axios from "axios";

function ModalAddProduct({ openModal, setOpenModal, onCreateProduct }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [aklAkd, setAklAkd] = useState("");
  const [expired, setExpired] = useState("");
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState([]);
  const [productMerk, setProductMerk] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [selectedProductMerk, setSelectedProductMerk] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [error, setError] = useState({
    productName: "",
    supplier: "",
    price: "",
    expired: "",
  });

  const productNameInputRef = useRef(null);

  const getMasterDynamic = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/data/master/transaction`
      );
      setProductType(response.data.data.productType);
      setProductMerk(response.data.data.productMerk);
      setSupplier(response.data.data.supplier);
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
    setPrice("");
    setStock("");
    setExpired("");
    setSelectedSupplier(null);
    setSelectedProductType(null);
    setSelectedProductMerk(null);
  };

  const handleCreateProduct = () => {
    let hasError = false;
    const newError = {
      productName: "",
      supplier: "",
      price: "",
      expired: "",
    };

    if (!productName) {
      newError.productName = "Product Name is required";
      hasError = true;
    }
    if (!selectedSupplier) {
      newError.supplier = "Distributor is required";
      hasError = true;
    }
    if (!price) {
      newError.price = "Price is required";
      hasError = true;
    }
    if (!expired) {
      newError.expired = "Expired status is required";
      hasError = true;
    }

    setError(newError);

    if (!hasError) {
      onCreateProduct({
        name: productName,
        aklAkd: aklAkd,
        price: price,
        stock: stock,
        expired: expired,
        supplierId: selectedSupplier.value,
        productType: selectedProductType ? selectedProductType.value : "",
        productMerk: selectedProductMerk ? selectedProductMerk.value : "",
      });
      handleCloseModal();
    }
  };

  useEffect(() => {
    getMasterDynamic();
  }, [openModal]);

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
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              id="productName"
              ref={productNameInputRef}
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            {error.productName && (
              <p className="text-red-500 pt-2">{error.productName}</p>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="distributor" value="Distributor" />
              <span className="text-red-500">*</span>
            </div>
            <Select
              id="distributor"
              value={selectedSupplier}
              onChange={(selectedOption) => setSelectedSupplier(selectedOption)}
              options={supplier.map((item) => ({
                value: item.supplier_id,
                label: item.supplier_code + "-" + item.supplier_name,
              }))}
              placeholder="Choose Distributor"
              isClearable
            />
            {error.supplier && (
              <p className="text-red-500 pt-2">{error.supplier}</p>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productType" value="Product Type" />
            </div>
            <Select
              id="productType"
              value={selectedProductType}
              onChange={(selectedOption) =>
                setSelectedProductType(selectedOption)
              }
              options={productType.map((type) => ({
                value: type.product_type_id,
                label: type.type_name,
              }))}
              placeholder="Choose Product type"
              isClearable
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productMerk" value="Product Merk" />
            </div>
            <Select
              id="productMerk"
              value={selectedProductMerk}
              onChange={(selectedOption) =>
                setSelectedProductMerk(selectedOption)
              }
              options={productMerk.map((merk) => ({
                value: merk.product_merk_id,
                label: merk.merk_name,
              }))}
              placeholder="Choose Product Merk"
              isClearable
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="akl_akd" value="No AKL/AKD" />
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
              <Label htmlFor="price" value="Price" />
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              id="price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {error.price && <p className="text-red-500 pt-2">{error.price}</p>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productExpired" value="Product Expired" />
              <span className="text-red-500">*</span>
            </div>
            <Select
              id="productExpired"
              value={
                expired
                  ? {
                      value: expired,
                      label: expired === "1" ? "Expired" : "Not Expired",
                    }
                  : null
              }
              onChange={(selectedOption) => setExpired(selectedOption.value)}
              options={[
                { value: "1", label: "Expired" },
                { value: "0", label: "Not Expired" },
              ]}
              placeholder="Expired and Not Expired"
              isClearable
            />
            {error.expired && (
              <p className="text-red-500 pt-2">{error.expired}</p>
            )}
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
        <Button onClick={handleCreateProduct} className="bg-teal-500">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddProduct;
