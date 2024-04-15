import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import { encryptNumber } from "../../utils/encryptionUtils";

function CustomerListCard({ customer }) {
  const [encryptedCustomerId, setEncryptedCustomerId] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

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
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-600">
            {customer.customer_name.charAt(0)}
          </span>
        </div>
        <div className="ml-4">
          <h3 className="text-base font-semibold text-gray-800">
            {customer.customer_name}
          </h3>
          <p className="text-sm text-gray-600">{customerEmail}</p>
        </div>
      </div>
      {encryptedCustomerId && (
        <Button
          href={`customer/${encryptedCustomerId}`}
          className="bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg inline-flex items-center text-sm transition-transform hover:translate-x-1 hover:translate-y-1"
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
