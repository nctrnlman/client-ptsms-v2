import React, { useRef, useState, useEffect } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";
import Select from "react-select";

function ModalEditProduct({ id, open, onClose, onEditProduct }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [aklAkd, setAklAkd] = useState("");
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState([]);
  const [productMerk, setProductMerk] = useState([]);
  const [expired, setExpired] = useState("");
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [selectedProductMerk, setSelectedProductMerk] = useState(null);
  const [errors, setErrors] = useState({
    productName: "",
    price: "",
    expired: "",
  });

  const productNameInputRef = useRef(null);

  const getMasterDynamic = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/data/master/transaction`
      );
      const productTypeOptions = response.data.data.productType.map((type) => ({
        value: type.product_type_id,
        label: type.type_name,
      }));
      const productMerkOptions = response.data.data.productMerk.map((merk) => ({
        value: merk.product_merk_id,
        label: merk.merk_name,
      }));
      setProductType(productTypeOptions);
      setProductMerk(productMerkOptions);
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
      setSelectedProductType({
        value: productData.product_type,
        label: productData.product_type_name,
      });
      setSelectedProductMerk({
        value: productData.product_merk,
        label: productData.product_merk_name,
      });
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedProduct = {
        name: productName,
        aklAkd: aklAkd,
        price: price,
        stock: stock,
        expired: expired,
        productType: selectedProductType,
        productMerk: selectedProductMerk,
      };

      // Validate required fields
      let isValid = true;
      const newErrors = {
        productName: "",
        price: "",
        expired: "",
      };

      if (!productName) {
        newErrors.productName = "Product Name is required";
        isValid = false;
      }
      if (!price) {
        newErrors.price = "Price is required";
        isValid = false;
      }
      if (!expired) {
        newErrors.expired = "Expired status is required";
        isValid = false;
      }

      if (!isValid) {
        setErrors(newErrors);
        return;
      }

      // Proceed with updating product if all fields are valid
      await onEditProduct(id, updatedProduct);
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
              <span className="text-red-500">*</span>
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
            {errors.productName && (
              <p className="text-red-500 pt-2">{errors.productName}</p>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productType" value="Product Type" />
            </div>
            <Select
              id="productType"
              value={
                selectedProductType
                  ? productType.find(
                      (option) => option.value === selectedProductType.value
                    )
                  : null
              }
              onChange={(option) => setSelectedProductType(option)}
              options={productType}
              isSearchable
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productMerk" value="Product Merk" />
            </div>
            <Select
              id="productMerk"
              value={
                selectedProductMerk
                  ? productMerk.find(
                      (option) => option.value === selectedProductMerk.value
                    )
                  : null
              }
              onChange={(option) => setSelectedProductMerk(option)}
              options={productMerk}
              isSearchable
            />
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
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              required={true}
            />
            {errors.price && (
              <p className="text-red-500 pt-2">{errors.price}</p>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productExpired" value="Product Expired" />
              <span className="text-red-500">*</span>
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
            {errors.expired && (
              <p className="text-red-500 pt-2">{errors.expired}</p>
            )}
          </div>
          {expired == "0" && (
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
