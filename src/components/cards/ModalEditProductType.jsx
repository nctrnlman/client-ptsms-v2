import { useRef, useState, useEffect } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";

function ModalEditProductType({
  id,
  openModal,
  setOpenModal,
  onUpdateProductType,
}) {
  const [productType, setProductType] = useState("");
  const productTypeNameInputRef = useRef(null);

  const fetchProductType = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/type/detail/${id}`
      );
      const { type_name } = response.data.data;
      setProductType(type_name);
    } catch (error) {
      console.error("Error fetching product type detail:", error);
    }
  };

  useEffect(() => {
    if (openModal) {
      fetchProductType();
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setProductType("");
  };

  const updateProductType = async () => {
    try {
      await onUpdateProductType(id, {
        name: productType,
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error updating distributor:", error);
    }
  };

  return (
    <Modal
      show={openModal}
      size="md"
      popup
      onClose={handleCloseModal}
      initialFocus={productTypeNameInputRef}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Edit Product Type
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="productType" value="Product Type Name" />
            </div>
            <TextInput
              id="productType"
              ref={productTypeNameInputRef}
              placeholder="Type A"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button
          onClick={updateProductType}
          className="bg-teal-500 hover:bg-teal-800"
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditProductType;
