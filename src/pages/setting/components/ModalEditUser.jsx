import { useRef, useState, useEffect } from "react";
import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import axios from "axios";

function ModalEditUser({ id, openModal, setOpenModal, onUpdateUser }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState(0);
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const userNameInputRef = useRef(null);

  const fetchUserDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/auth/user/${id}`
      );
      setUserName(response.data.data.name);
      setEmail(response.data.data.email);
      setSelectedRole(response.data.data.role_id);
    } catch (error) {
      console.error("Error fetching User detail:", error);
    }
  };

  const getMasterDynamic = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/data/master/users`
      );
      setRole(response.data.data.roles);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    if (openModal) {
      getMasterDynamic();
      fetchUserDetail();
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setUserName("");
    setEmail("");
    setRole([]);
    setUserNameError("");
    setEmailError("");
    setRoleError("");
  };

  const updateUser = async () => {
    let isValid = true;

    if (!userName) {
      setUserNameError("Username is required");
      isValid = false;
    } else {
      setUserNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!selectedRole) {
      setRoleError("Role is required");
      isValid = false;
    } else {
      setRoleError("");
    }

    if (isValid) {
      try {
        await onUpdateUser(id, {
          username: userName,
          email: email,
          role_id: selectedRole,
        });
        handleCloseModal();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <Modal
      show={openModal}
      size="md"
      popup
      onClose={handleCloseModal}
      initialFocus={userNameInputRef}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Add New User
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="userName" value="Username" />
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              id="userName"
              ref={userNameInputRef}
              placeholder="John Doe"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {userNameError && <p className="text-red-500">{userNameError}</p>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="John@yopmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="role" value="Role" />
              <span className="text-red-500">*</span>
            </div>
            <Select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Choose User Role</option>
              {role.map((role) => (
                <option key={role.role_id} value={role.role_id}>
                  {role.name}
                </option>
              ))}
            </Select>
            {roleError && <p className="text-red-500">{roleError}</p>}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={updateUser} className="bg-teal-500 hover:bg-teal-800">
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditUser;
