import { Modal, Button, Label } from "flowbite-react";

function ModalGeneral({ isOpen, onClose, title, content }) {
  return (
    <Modal show={isOpen} size="md" popup onClose={onClose}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {title}
          </h3>

          <div key={content}>
            <div className="mb-2 block">
              <Label htmlFor={content} value={content} />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalGeneral;
