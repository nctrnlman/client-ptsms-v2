import { useRef, useState, useEffect } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";

function ModalEditCustomer({ id, openModal, setOpenModal, onUpdateCustomer }) {
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState("");
  const distributorNameInputRef = useRef(null);

  const fetchCustomerDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/customer/detail/${id}`
      );
      const { customer_name } = response.data.data;
      setCustomerName(customer_name);
    } catch (error) {
      console.error("Error fetching customer detail:", error);
    }
  };

  useEffect(() => {
    if (openModal) {
      fetchCustomerDetail();
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setCustomerName("");
    setError("");
  };

  const updateCustomer = async () => {
    if (customerName.trim() === "") {
      setError("Customer Name is required.");
    } else {
      try {
        await onUpdateCustomer(id, {
          name: customerName,
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
            Edit Customer
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="customerName" value="Customer Name" />
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              id="customerName"
              ref={distributorNameInputRef}
              placeholder="PT Sehat Murni Sejahtera"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                setError("");
              }}
            />
            {error && <p className="text-red-500 pt-2">{error}</p>}{" "}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button
          onClick={updateCustomer}
          className="bg-teal-500 hover:bg-teal-800"
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditCustomer;
