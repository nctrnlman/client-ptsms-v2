// Komponen Repeater.js
import React from "react";
import { RiCloseCircleLine, RiAddLine } from "react-icons/ri";
import { Datepicker } from "flowbite-react";

function Repeater({ product, productType, productMerk, setProduct }) {
  const [inputs, setInputs] = React.useState([
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
    setProduct((prevData) => ({
      ...prevData,
      productList: newInputs,
    })); // Update the product data in the parent component
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
    setProduct((prevData) => ({
      ...prevData,
      productList: newInputs,
    }));
  };

  return (
    <div className="w-fullgrid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
      {inputs.map((input, index) => (
        <div key={index} className="flex gap-3 mt-4">
          <select
            name="productName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={input.productName}
            onChange={(e) => handleChange(index, "productName", e.target.value)}
          >
            <option value="">Select Product</option>
            {product?.map((product, idx) => (
              <option key={idx} value={product.product_id}>
                {product.product_name}
              </option>
            ))}
          </select>
          <div className="w-full">
            <Datepicker
              title="Expired Date"
              language="en"
              labelTodayButton="Today"
              labelClearButton="Clear"
              id="productExpired"
              name="productExpired"
              value={input.productExpired}
              onSelectedDateChanged={(date) =>
                handleChange(index, "productExpired", date)
              }
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
          <select
            name="productType"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={input.productType}
            onChange={(e) => handleChange(index, "productType", e.target.value)}
          >
            <option value="">Select Product Type</option>
            {productType?.map((type, idx) => (
              <option key={idx} value={type.product_type_id}>
                {type.type_name}
              </option>
            ))}
          </select>
          <input
            type="text"
            id="akl_akd"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="No AKL/AKD"
            required
          />
          <select
            name="productBrand"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={input.productBrand}
            onChange={(e) =>
              handleChange(index, "productBrand", e.target.value)
            }
          >
            <option value="">Select Product Brand</option>
            {productMerk?.map((merk, idx) => (
              <option key={idx} value={merk.product_merk_id}>
                {merk.merk_name}
              </option>
            ))}
          </select>
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
