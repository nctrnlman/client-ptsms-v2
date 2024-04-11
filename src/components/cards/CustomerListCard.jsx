import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import { encryptNumber } from "../../utils/encryptionUtils";

function CustomerListCard({ customer }) {
  const [encryptedCustomerId, setEncryptedCustomerId] = useState("");

  useEffect(() => {
    try {
      const encryptedId = encryptNumber(customer.customer_id);
      setEncryptedCustomerId(encryptedId);
    } catch (error) {
      console.error("Error encrypting customer ID:", error);
    }
  }, [customer.customer_id]);

  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {customer.customer_name}
      </h5>

      {/* Pengecekan apakah encryptedCustomerId sudah diatur */}
      {encryptedCustomerId && (
        <Button
          href={`customer/${encryptedCustomerId}`}
          className="bg-brand-500"
        >
          See Detail
          <svg
            className="-mr-1 ml-2 h-4 w-4"
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
