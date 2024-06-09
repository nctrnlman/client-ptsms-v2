import { useState, useEffect } from "react";
import { RiCloseCircleLine, RiAddLine } from "react-icons/ri";
import Select from "react-select";
import { formatCurrency, removeCurrencyFormat } from "../../utils/converter";

function AddProductRepeater({
  product,
  setProduct,
  productMerk,
  productType,
  supplier,
  loading,
}) {
  const [inputs, setInputs] = useState([
    {
      product_name: "",
      supplier: "",
      product_type: "",
      product_merk: "",
      akl_akd: "",
      price: "",
      product_expired: "",
      stock: 0,
    },
  ]);

  const handleChange = (index, name, value) => {
    const newInputs = [...inputs];
    if (name === "price") {
      const priceWithoutFormat = removeCurrencyFormat(value);
      newInputs[index][name] = formatCurrency(priceWithoutFormat);
    } else {
      newInputs[index][name] = value;
    }
    // newInputs[index][name] = value;
    setInputs(newInputs);
    setProduct((prevData) => ({
      ...prevData,
      productList: newInputs,
    }));
  };

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        product_name: "",
        supplier: "",
        product_type: "",
        product_merk: "",
        akl_akd: "",
        price: "",
        product_expired: "",
        stock: 0,
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

  useEffect(() => {}, []);
  return (
    <div className="gap-6 ">
      {inputs.map((input, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-3 mt-4 "
        >
          <div>
            <label
              htmlFor="product_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Name<span className="text-red-500">*</span>
            </label>

            <input
              name="product_name"
              placeholder="Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              value={input.product_name}
              onChange={(e) =>
                handleChange(index, "product_name", e.target.value)
              }
            />
          </div>
          <div>
            <label
              htmlFor="supplier"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Distributor<span className="text-red-500">*</span>
            </label>
            <Select
              id="supplier"
              value={
                input.supplier
                  ? {
                      value: input.supplier,
                      label: supplier.find(
                        (option) => option.supplier_id === input.supplier
                      )?.supplier_name,
                    }
                  : null
              }
              onChange={(selectedOption) =>
                handleChange(index, "supplier", selectedOption.value)
              }
              options={supplier.map((option) => ({
                value: option.supplier_id,
                label: option.supplier_code + "-" + option.supplier_name,
              }))}
              placeholder="Choose a Distributor"
              isClearable
              isDisabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="product_type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product type<span className="text-red-500">*</span>
            </label>
            <Select
              id="product_type"
              value={
                input.product_type
                  ? {
                      value: input.product_type,
                      label: productType.find(
                        (option) =>
                          option.product_type_id === input.product_type
                      )?.type_name,
                    }
                  : null
              }
              onChange={(selectedOption) =>
                handleChange(index, "product_type", selectedOption.value)
              }
              options={productType.map((option) => ({
                value: option.product_type_id,
                label: option.type_name,
              }))}
              placeholder="Choose a Product type"
              isClearable
              isDisabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="product_merk"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product merk<span className="text-red-500">*</span>
            </label>
            <Select
              id="product_merk"
              value={
                input.product_merk
                  ? {
                      value: input.product_merk,
                      label: productMerk.find(
                        (option) =>
                          option.product_merk_id === input.product_merk
                      )?.merk_name,
                    }
                  : null
              }
              onChange={(selectedOption) =>
                handleChange(index, "product_merk", selectedOption.value)
              }
              options={productMerk.map((option) => ({
                value: option.product_merk_id,
                label: option.merk_name,
              }))}
              placeholder="Choose a Product merk"
              isClearable
              isDisabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="akl_akd"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              No AKL/AKD
            </label>
            <input
              name="akl_akd"
              placeholder="No AKL/AKD"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              value={input.akl_akd}
              onChange={(e) => handleChange(index, "akl_akd", e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              name="price"
              placeholder="Rp. 0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              value={input.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="product_expired"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Expired<span className="text-red-500">*</span>
            </label>

            <Select
              id="productExpired"
              value={
                input.product_expired
                  ? {
                      value: input.product_expired,
                      label:
                        input.product_expired === "1"
                          ? "Expired"
                          : "Not Expired",
                    }
                  : ""
              }
              onChange={(selectedOption) =>
                handleChange(index, "product_expired", selectedOption.value)
              }
              options={[
                { value: "1", label: "Expired" },
                { value: "0", label: "Not Expired" },
              ]}
              placeholder="Expired and Not Expired"
              isClearable
            />
          </div>
          {input.product_expired === "0" && (
            <div>
              <label
                htmlFor="stock"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stock
              </label>

              <input
                id="stock"
                type="number"
                placeholder="Enter stock"
                name="stock"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={input.stock}
                onChange={(e) => handleChange(index, "stock", e.target.value)}
              />
            </div>
          )}
          <div className="flex pt-4 text-2xl  ">
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
        </div>
      ))}
    </div>
  );
}

export default AddProductRepeater;
