import React, { useRef, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";

function ModalAddDistributor({ openModal, setOpenModal, onCreateDistributor }) {
  const [distributorName, setDistributorName] = useState("");
  const [distributorCode, setDistributorCode] = useState("");
  const distributorNameInputRef = useRef(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setDistributorName("");
    setDistributorCode("");
  };

  const handleCreateDistributor = () => {
    onCreateDistributor({ name: distributorName, code: distributorCode });
    handleCloseModal();
  };

  return (
    <Modal
      show={openModal}
      size="md"
      popup
      onClose={handleCloseModal}
      initialFocus={distributorNameInputRef}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Add New Distributor
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="distributorName" value="Distributor Name" />
            </div>
            <TextInput
              id="distributorName"
              ref={distributorNameInputRef}
              placeholder="PT Sehat Murni Sejahtera"
              value={distributorName}
              onChange={(e) => setDistributorName(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="distributorCode" value="Distributor Code" />
            </div>
            <TextInput
              id="distributorCode"
              placeholder="AB"
              value={distributorCode}
              onChange={(e) => setDistributorCode(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={handleCreateDistributor} className="bg-teal-500 ">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddDistributor;
