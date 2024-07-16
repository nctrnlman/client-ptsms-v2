import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

function Modals({ openModal, setOpenModal, inputs }) {
  const inputRefs = inputs.map(() => useRef < HTMLInputElement > null);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    setInputs(newInputs);
  };

  const handleLogin = () => {
    const formData = inputs.reduce((data, input) => {
      data[input.id] = input.value;
      return data;
    }, {});

    handleCloseModal();
  };

  return (
    <Modal
      show={openModal}
      size="md"
      popup
      onClose={handleCloseModal}
      initialFocus={inputRefs[0]}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h3>
          {inputs.map((input, index) => (
            <div key={index}>
              <div className="mb-2 block">
                <Label htmlFor={input.id} value={input.label} />
              </div>
              <TextInput
                id={input.id}
                ref={inputRefs[index]}
                placeholder={input.placeholder}
                type={input.type}
                required={input.required}
                value={input.value}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          ))}
          <div className="w-full">
            <Button onClick={handleLogin}>Submit</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Modals;
