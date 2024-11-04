import { useRef, useState, useEffect } from "react";
import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import axios from "axios";

function ModalEditUser({ id, openModal, setOpenModal, onResetPasswordUser }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const passwordInputRef = useRef(null);

  useEffect(() => {
    if (openModal) {
      setPassword("");
      setPasswordError("");
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setPassword("");
    setPasswordError("");
  };

  const resetPassword = async () => {
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

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
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              id="password"
              ref={passwordInputRef}
              placeholder="Insert New Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(""); // Reset password error
              }}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
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
