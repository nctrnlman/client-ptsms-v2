import { RiCloseCircleLine, RiAddLine } from "react-icons/ri";
import { useState } from "react";
import { Datepicker } from "flowbite-react";

function Repeater() {
  const [inputs, setInputs] = useState([
    {
      productName: "",
      productExpired: "",
      productQty: "",
      productType: "",
      productBrand: "",
    },
  ]);

  const handleChange = (index, name, value) => {
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        productName: "",
        productExpired: "",
        productQty: "",
        productType: "",
        productBrand: "",
      },
    ]);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  return (
    <div className="w-fullgrid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
      {inputs.map((input, index) => (
        <div key={index} className="flex gap-3 mt-4">
          <input
            name="productName"
            placeholder="Product Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={input.productName}
            onChange={(e) => handleChange(index, "productName", e.target.value)}
          />
          <div className="w-full">
            <Datepicker
              title="Expired Date"
              language="en"
              labelTodayButton="Today"
              labelClearButton="Clear"
              selected={input.productExpired}
              onChange={(date) => handleChange(index, "productExpired", date)}
            />
          </div>
          <input
            name="productQty"
            placeholder="Product Quantity"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={input.productQty}
            onChange={(e) => handleChange(index, "productQty", e.target.value)}
          />
          <input
            name="productType"
            placeholder="Product Type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={input.productType}
            onChange={(e) => handleChange(index, "productType", e.target.value)}
          />
          <input
            name="productBrand"
            placeholder="Product Brand"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={input.productBrand}
            onChange={(e) =>
              handleChange(index, "productBrand", e.target.value)
            }
          />
          {index === 0 ? (
            <button onClick={handleAddInput}>
              <RiAddLine />
            </button>
          ) : (
            <button onClick={() => handleRemoveInput(index)}>
              <RiCloseCircleLine />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Repeater;
