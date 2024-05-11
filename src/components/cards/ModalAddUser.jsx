import { useEffect, useRef, useState } from "react";
import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import axios from "axios";

function ModalAddUser({ openModal, setOpenModal, onCreateUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState(0);
  const [loading, setLoading] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [requiredFieldsError, setRequiredFieldsError] = useState("");
  const userNameInputRef = useRef(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setUserName("");
    setPassword("");
    setEmail("");
    setRole([]);
  };

  const getMasterDynamic = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/data/master/users`
      );
      setRole(response.data.data.roles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching options:", error);
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    if (!userName || !password || !email || !selectedRole) {
      setRequiredFieldsError("All fields are required");
      return;
    }
    onCreateUser({
      username: userName,
      email: email,
      password: password,
      role_id: selectedRole,
    });
    handleCloseModal();
  };

  const validateEmail = (email) => {
    const re =
      // Regular expression for validating email format
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  useEffect(() => {
    getMasterDynamic();
  }, [openModal]);

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  }, [email]);

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
              onChange={(e) => {
                setUserName(e.target.value);
                setRequiredFieldsError(""); // Reset required fields error
              }}
            />
            {requiredFieldsError && !userName && (
              <p className="text-red-500">Username is required</p>
            )}
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
              onChange={(e) => {
                setEmail(e.target.value);
                setRequiredFieldsError(""); // Reset required fields error
              }}
            />
            {requiredFieldsError && !email && (
              <p className="text-red-500">Email is required</p>
            )}
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setRequiredFieldsError(""); // Reset required fields error
              }}
            />
            {requiredFieldsError && !password && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="role" value="Role" />
              <span className="text-red-500">*</span>
            </div>
            <Select
              id="role"
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setRequiredFieldsError(""); // Reset required fields error
              }}
            >
              <option value="">Choose User Role</option>
              {role.map((role) => (
                <option key={role.role_id} value={role.role_id}>
                  {role.name}
                </option>
              ))}
            </Select>
            {requiredFieldsError && !selectedRole && (
              <p className="text-red-500">Role is required</p>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={handleCreateUser} className="bg-teal-500 ">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddUser;
