import React, { useRef, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";

function ModalAddCustomer({ openModal, setOpenModal, onCreateCustomer }) {
  const [customerName, setCustomerName] = useState("");
  const customerNameInputRef = useRef(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setCustomerName("");
  };

  const handleCreateCustomer = () => {
    onCreateCustomer({ name: customerName });
    handleCloseModal();
  };

  return (
    <Modal
      show={openModal}
      size="md"
      popup
      onClose={handleCloseModal}
      initialFocus={customerNameInputRef}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Add New Customer
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="customerName" value="Customer Name" />
            </div>
            <TextInput
              id="customerName"
              ref={customerNameInputRef}
              placeholder="PT Sehat Murni Sejahtera"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={handleCreateCustomer} className="bg-teal-500 ">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddCustomer;
