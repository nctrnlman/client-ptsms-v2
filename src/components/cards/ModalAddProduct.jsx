import React, { useRef, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";

function ModalAddProduct({ openModal, setOpenModal, onCreateProduct }) {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const productNameInputRef = useRef(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setProductName("");
    setProductCode("");
    setCategory("");
    setPrice("");
    setStock("");
  };

  const handleCreateProduct = () => {
    onCreateProduct({
      name: productName,
      code: productCode,
      category: category,
      price: price,
      stock: stock,
    });
    handleCloseModal();
  };

  return (
    <Modal
      show={openModal}
      size="md"
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
              <Label htmlFor="productCode" value="Product Code" />
            </div>
            <TextInput
              id="productCode"
              placeholder="Enter product code"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category" />
            </div>
            <TextInput
              id="category"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" />
            </div>
            <TextInput
              id="price"
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
