import React, { useRef, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";

function ModalAddProductMerk({ openModal, setOpenModal, onCreateProductMerk }) {
  const [productMerk, setProductMerk] = useState("");
  const productMerkInputRef = useRef(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setProductMerk("");
  };

  const handleProductMerkName = () => {
    onCreateProductMerk({ merkName: productMerk });
    handleCloseModal();
  };

  return (
    <Modal
      show={openModal}
      size="md"
      popup
      onClose={handleCloseModal}
      initialFocus={productMerkInputRef}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Add New Product Merk
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productMerk" value="Product Merk Name" />
            </div>
            <TextInput
              id="productMerk"
              ref={productMerkInputRef}
              placeholder="Merk A"
              value={productMerk}
              onChange={(e) => setProductMerk(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={handleProductMerkName} className="bg-teal-500 ">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddProductMerk;
