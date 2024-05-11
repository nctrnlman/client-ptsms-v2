import { useRef, useState, useEffect } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";

function ModalEditDistributor({
  id,
  openModal,
  setOpenModal,
  onUpdateDistributor,
}) {
  const [distributorName, setDistributorName] = useState("");
  const [distributorCode, setDistributorCode] = useState("");
  const [nameError, setNameError] = useState("");
  const [codeError, setCodeError] = useState("");
  const distributorNameInputRef = useRef(null);

  const fetchDistributorDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/supplier/detail/${id}`
      );
      const { supplier_name, supplier_code } = response.data.data;
      setDistributorName(supplier_name);
      setDistributorCode(supplier_code);
    } catch (error) {
      console.error("Error fetching distributor detail:", error);
    }
  };

  useEffect(() => {
    if (openModal) {
      fetchDistributorDetail();
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setDistributorName("");
    setDistributorCode("");
    setNameError("");
    setCodeError("");
  };

  const updateDistributor = async () => {
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
      try {
        await onUpdateDistributor(id, {
          name: distributorName,
          code: distributorCode,
        });
        handleCloseModal();
      } catch (error) {
        console.error("Error updating distributor:", error);
      }
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
            Edit Distributor
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
            {nameError && <p className="text-red-500 pt-2">{nameError}</p>}{" "}
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
            {codeError && <p className="text-red-500 pt-2">{codeError}</p>}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button
          onClick={updateDistributor}
          className="bg-teal-500 hover:bg-teal-800"
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditDistributor;
