import { useState, useEffect } from "react";
import { RiCloseCircleLine, RiAddLine } from "react-icons/ri";
import { Datepicker } from "flowbite-react";
import Select from "react-select";

function Repeater({ product, setProduct, formData }) {
  const [inputs, setInputs] = useState([
    {
      product_id: "",
      product_code: "",
      batch_lot: "",
      expired_date: "",
      quantity: "",
    },
  ]);

  const handleChange = (index, name, value) => {
    let newValue = value;

    // Jika field yang diubah adalah 'quantity'
    if (name === "quantity") {
      // Memeriksa apakah nilai yang dimasukkan bukan string kosong
      if (value !== "") {
        // Memastikan bahwa nilai yang dimasukkan adalah angka
        const parsedValue = parseFloat(value);
        // Jika nilai yang dimasukkan bukan angka, atur nilainya ke 0
        if (isNaN(parsedValue)) {
          newValue = 0;
        } else {
          // Jika nilai yang dimasukkan adalah angka, tetapi kurang dari 0, atur nilainya ke 0
          newValue = Math.max(0, parsedValue);
        }
      }
    }

    // Mengupdate state inputs
    const newInputs = [...inputs];
    newInputs[index][name] = newValue;
    setInputs(newInputs);

    // Mengupdate state productList pada form data
    setProduct((prevData) => ({
      ...prevData,
      productList: newInputs,
    }));
  };

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        product_id: "",
        product_code: "",
        batch_lot: "",
        expired_date: "",
        quantity: "",
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

  useEffect(() => {
    if (formData?.productList?.length > 0) {
      setInputs(
        formData.productList?.map((productItem) => ({
          ...productItem,
          productName: productItem.product_id,
          productQty: productItem.quantity,
          productExpired: productItem.expired_date,
        }))
      );
    }
  }, [product]);

  return (
    <div className="flex flex-col gap-6">
      {inputs.map((input, index) => {
        const selectedProduct = product.find(
          (prod) => prod.product_id == input.product_id
        );

        const isExpired = selectedProduct ? selectedProduct.isExpired : null;
        return (
          <div key={index} className="flex gap-3 mt-4">
            <div>
              <label
                htmlFor="note"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name<span className="text-red-500">*</span>
              </label>

              <Select
                id="product_id"
                value={
                  input.product_id
                    ? {
                        value: input.product_id,
                        label: product.find(
                          (option) => option.product_id === input.product_id
                        )
                          ? `${
                              product.find(
                                (option) =>
                                  option.product_id === input.product_id
                              ).product_id
                            } - ${
                              product.find(
                                (option) =>
                                  option.product_id === input.product_id
                              ).product_name
                            }`
                          : null,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleChange(
                    index,
                    "product_id",
                    selectedOption ? selectedOption.value : null
                  )
                }
                options={product.map((option) => ({
                  value: option.product_id,
                  label: `${option.product_id} - ${option.product_name}`,
                }))}
                placeholder="Select Product"
                isClearable
                isDisabled={product.length > 1 ? false : true}
              />
            </div>

            <div>
              <label
                htmlFor="productCode"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Code
              </label>
              <input
                name="productCode"
                placeholder="Product Code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={input.product_code}
                onChange={(e) =>
                  handleChange(index, "product_code", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="batchLot"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Batch/Lot
              </label>
              <input
                name="batchLot"
                placeholder="Batch/Lot"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={input.batch_lot}
                onChange={(e) =>
                  handleChange(index, "batch_lot", e.target.value)
                }
              />
            </div>

            <div className="">
              <label
                htmlFor="note"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Expired
              </label>
              <Datepicker
                title="Expired Date"
                language="en"
                labelTodayButton="Today"
                labelClearButton="Clear"
                id="expired_date"
                name="expired_date"
                value={input.expired_date}
                onSelectedDateChanged={(date) => {
                  const formattedDate = new Date(date).toLocaleDateString(
                    "en-CA"
                  );
                  handleChange(index, "expired_date", formattedDate);
                }}
                disabled={isExpired == 0} // Menonaktifkan Datepicker jika produk tidak kedaluwarsa
              />
            </div>
            <div>
              <label
                htmlFor="note"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Qty<span className="text-red-500">*</span>
              </label>
              <input
                name="quantity"
                placeholder="Product Quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                value={input.quantity}
                onChange={(e) =>
                  handleChange(index, "quantity", e.target.value)
                }
              />
            </div>

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
        );
      })}
    </div>
  );
}

export default Repeater;
