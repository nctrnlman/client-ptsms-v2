import React, { useRef, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";

function ModalAddSales({ openModal, setOpenModal, onCreateSales }) {
  const [salesName, setSalesName] = useState("");
  const salesNameInputRef = useRef(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSalesName("");
  };

  const handleCreateSales = () => {
    onCreateSales({ name: salesName });
    handleCloseModal();
  };

  return (
    <Modal
      show={openModal}
      size="md"
      popup
      onClose={handleCloseModal}
      initialFocus={salesNameInputRef}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Add New Sales Man
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="salesName" value="Sales Name" />
            </div>
            <TextInput
              id="salesName"
              ref={salesNameInputRef}
              placeholder="John Doe"
              value={salesName}
              onChange={(e) => setSalesName(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={handleCreateSales} className="bg-teal-500 ">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddSales;
