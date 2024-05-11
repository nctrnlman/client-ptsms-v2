import { useRef, useState, useEffect } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";

function ModalEditProductMerk({
  id,
  openModal,
  setOpenModal,
  onUpdateProductMerk,
}) {
  const [productMerk, setProductMerk] = useState("");
  const [error, setError] = useState("");
  const productMerkNameInputRef = useRef(null);

  const fetchProductMerk = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/merk/detail/${id}`
      );
      const { merk_name } = response.data.data;
      setProductMerk(merk_name);
    } catch (error) {
      console.error("Error fetching product merk detail:", error);
    }
  };

  useEffect(() => {
    if (openModal) {
      fetchProductMerk();
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setProductMerk("");
    setError("");
  };

  const updateProductMerk = async () => {
    if (productMerk.trim() === "") {
      setError("Product Merk Name is required.");
    } else {
      try {
        await onUpdateProductMerk(id, {
          name: productMerk,
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
      initialFocus={productMerkNameInputRef}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Edit Product Merk
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productMerk" value="Product Merk Name" />
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              id="productMerk"
              ref={productMerkNameInputRef}
              placeholder="Merk A"
              value={productMerk}
              onChange={(e) => {
                setProductMerk(e.target.value);
                setError("");
              }}
            />
            {error && <p className="text-red-500 pt-2">{error}</p>}{" "}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button
          onClick={updateProductMerk}
          className="bg-teal-500 hover:bg-teal-800"
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditProductMerk;
