import React, { useRef, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";

function ModalEditSales({ id, openModal, setOpenModal, onUpdateSales }) {
  const [salesName, setSalesName] = useState("");
  const [error, setError] = useState("");
  const salesNameInputRef = useRef(null);

  const fetchSalesDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/sales/${id}`
      );
      const { sales_name } = response.data.data.salesDetail;
      setSalesName(sales_name);
    } catch (error) {
      console.error("Error fetching Sales detail:", error);
    }
  };

  React.useEffect(() => {
    if (openModal) {
      fetchSalesDetail();
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSalesName("");
    setError("");
  };

  const updateSales = async () => {
    if (salesName.trim() === "") {
      setError("Sales Name is required.");
    } else {
      try {
        await onUpdateSales(id, {
          name: salesName,
        });
        handleCloseModal();
      } catch (error) {
        console.error("Error updating salesman:", error);
      }
    }
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
            Edit Salesman
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="salesName" value="Sales Name" />
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              id="salesName"
              ref={salesNameInputRef}
              placeholder="PT Sehat Murni Sejahtera"
              value={salesName}
              onChange={(e) => {
                setSalesName(e.target.value);
                setError("");
              }}
            />
            {error && <p className="text-red-500 pt-2">{error}</p>}{" "}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={updateSales} className="bg-teal-500 hover:bg-teal-800">
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditSales;
