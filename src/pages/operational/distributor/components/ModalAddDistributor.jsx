import { useRef, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";

function ModalAddDistributor({ openModal, setOpenModal, onCreateDistributor }) {
  const [distributorName, setDistributorName] = useState("");
  const [distributorCode, setDistributorCode] = useState("");
  const [nameError, setNameError] = useState("");
  const [codeError, setCodeError] = useState("");
  const distributorNameInputRef = useRef(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setDistributorName("");
    setDistributorCode("");
    setNameError("");
    setCodeError("");
  };

  const handleCreateDistributor = () => {
    if (distributorName.trim() === "") {
      setNameError("Distributor Name is required.");
    } else {
      setNameError("");
    }

    if (distributorCode.trim() === "") {
      setCodeError("Distributor Code is required.");
    } else {
      setCodeError("");
    }
    if (distributorName.trim() !== "" && distributorCode.trim() !== "") {
      onCreateDistributor({ name: distributorName, code: distributorCode });
      handleCloseModal();
    }
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
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              id="distributorName"
              ref={distributorNameInputRef}
              placeholder="PT Sehat Murni Sejahtera"
              value={distributorName}
              onChange={(e) => {
                setDistributorName(e.target.value);
                setNameError("");
              }}
            />
            {nameError && <p className="text-red-500">{nameError}</p>}{" "}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="distributorCode" value="Distributor Code" />
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              id="distributorCode"
              placeholder="AB"
              value={distributorCode}
              onChange={(e) => {
                setDistributorCode(e.target.value);
                setCodeError("");
              }}
            />
            {codeError && <p className="text-red-500 pt-2">{codeError}</p>}{" "}
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
