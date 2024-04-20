import { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import { encryptNumber } from "../../utils/encryptionUtils";

function CustomerListCard({
  customer,
  setOpenModalEdit,
  setOpenModalDelete,
  setSelectedProductId,
}) {
  const [encryptedCustomerId, setEncryptedCustomerId] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const handleEditClick = () => {
    setSelectedProductId(customer.customer_id);
    setOpenModalEdit(true);
  };

  const handleDeleteClick = () => {
    setOpenModalDelete(true);
    setSelectedProductId(customer.customer_id);
  };

  useEffect(() => {
    try {
      const encryptedId = encryptNumber(customer.customer_id);
      setEncryptedCustomerId(encryptedId);
    } catch (error) {
      console.error("Error encrypting customer ID:", error);
    }

    // set customer email or 'No email available' if not provided
    setCustomerEmail(customer.email ? customer.email : "No email available");
  }, [customer.customer_id, customer.email]);

  return (
    <Card className="max-w-sm bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-3 ">
        <div className="flex">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-600">
              {customer.customer_name.charAt(0)}
            </span>
          </div>
          <div className="ml-4 ">
            <h3 className="text-base font-semibold text-gray-800">
              {customer.customer_name}
            </h3>
            <p className="text-sm text-gray-600">{customerEmail}</p>
          </div>
        </div>

        <div className=" flex gap-2 top-0">
          <button className="text-blueSecondary" onClick={handleEditClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 36 36"
            >
              <path
                fill="currentColor"
                d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2.14 2.14 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z"
                className="clr-i-outline clr-i-outline-path-1"
              ></path>
              <path fill="none" d="M0 0h36v36H0z"></path>
            </svg>
          </button>
          <button className="text-red-600" onClick={handleDeleteClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {encryptedCustomerId && (
        <Button
          href={`customer/${encryptedCustomerId}`}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg inline-flex items-center text-sm transition-transform hover:translate-x-1 hover:translate-y-1"
        >
          <span className="mr-1">Details</span>
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      )}
    </Card>
  );
}

export default CustomerListCard;
