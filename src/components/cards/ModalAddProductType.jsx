import React, { useRef, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";

function ModalAddProductType({ openModal, setOpenModal, onCreateProductType }) {
  const [productType, setProductType] = useState("");
  const productTypeInputRef = useRef(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setProductType("");
  };

  const handleProductTypeName = () => {
    onCreateProductType({ typeName: productType });
    handleCloseModal();
  };

  return (
    <Modal
      show={openModal}
      size="md"
      popup
      onClose={handleCloseModal}
      initialFocus={productTypeInputRef}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Add New Product Type
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productType" value="Product Type Name" />
            </div>
            <TextInput
              id="productType"
              ref={productTypeInputRef}
              placeholder="Type A"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={handleProductTypeName} className="bg-teal-500 ">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddProductType;
