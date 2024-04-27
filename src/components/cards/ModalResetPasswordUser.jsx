import { useRef, useState, useEffect } from "react";
import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import axios from "axios";

function ModalEditUser({ id, openModal, setOpenModal, onResetPasswordUser }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const passwordInputRef = useRef(null);

  // const fetchUserDetail = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_BASE_URL}/auth/user/detail/${id}`
  //     );
  //     setPassword(response.data.data.password);
  //   } catch (error) {
  //     console.error("Error fetching User detail:", error);
  //   }
  // };

  useEffect(() => {
    if (openModal) {
      // fetchUserDetail();
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setPassword("");
  };

  const resetPassword = async () => {
    try {
      await onResetPasswordUser(id, {
        password: password,
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal
      show={openModal}
      size="md"
      popup
      onClose={handleCloseModal}
      initialFocus={passwordInputRef}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Reset Password User
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              ref={passwordInputRef}
              placeholder="Insert New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button
          onClick={resetPassword}
          className="bg-teal-500 hover:bg-teal-800"
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditUser;
