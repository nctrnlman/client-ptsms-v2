import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decryptNumber } from "../../../utils/encryptionUtils";

function CustomerDetail() {
  const [decrypteId, setDecrypteId] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    try {
      const encryptedId = decryptNumber(id);
      setDecrypteId(encryptedId);
    } catch (error) {
      console.error("Error encrypting customer ID:", error);
    }
  }, [id]);
  return <div>CustomerDetail : {decrypteId}</div>;
}

export default CustomerDetail;
