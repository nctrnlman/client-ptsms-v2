import { useState, useEffect } from "react";
import { RiCloseCircleLine, RiAddLine } from "react-icons/ri";

function AddProductRepeater({ product, setProduct, formData }) {
  const [inputs, setInputs] = useState([
    {
      product_id: "",
      qty: 0,
      productPrice: "",
      discount: "",
      ppn: "11",
      pph: "1.5",
    },
  ]);

  const handleChange = (index, name, value) => {
    const newInputs = [...inputs];
    newInputs[index][name] = value;

    // Update product price if product is selected and quantity is filled
    if (name === "qty" && value && newInputs[index]["product_id"]) {
      const selectedProduct = product.find(
        (p) => p.product_id === parseInt(newInputs[index]["product_id"])
      );
      if (selectedProduct) {
        newInputs[index]["productPrice"] =
          selectedProduct.price * parseInt(value);
      }
    }

    // Calculate total price
    const price = parseFloat(newInputs[index]["productPrice"]) || 0;
    const qty = parseFloat(newInputs[index]["qty"]) || 0;
    const disc = parseFloat(newInputs[index]["discount"]) || 0;
    const ppn = parseFloat(newInputs[index]["ppn"].replace("%", "")) || 0;
    const pph = parseFloat(newInputs[index]["pph"].replace("%", "")) || 0;

    const totalPrice =
      price * qty * (1 - disc / 100) * (1 + ppn / 100) * (1 + pph / 100);
    newInputs[index]["productTotalPrice"] = totalPrice;

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
        product_id: "",
        qty: 0,
        productPrice: "",
        discount: "",
        ppn: "11",
        pph: "1.5",
        productTotalPrice: "",
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
    // Initial price update when products are pre-selected
    inputs.forEach((input, index) => {
      if (input.product_id && input.qty) {
        const selectedProduct = product.find(
          (p) => p.product_id === parseInt(input.product_id)
        );
        if (selectedProduct) {
          const newInputs = [...inputs];
          newInputs[index]["productPrice"] =
            selectedProduct.price * parseInt(input.qty);
          setInputs(newInputs);
        }
      }
    });

    if (formData?.productList?.length > 0) {
      setInputs(
        formData.productList?.map((productItem) => ({
          ...productItem,
          product_id: productItem.product_id,
          qty: productItem.qty,
          productPrice: productItem.price,
          discount: productItem.discount,
          ppn: productItem.ppn,
          pph: productItem.pph,

          productTotalPrice: productItem.amount_tax,
          // Map other properties accordingly
        }))
      );
    }
  }, [product]);
  return (
    <div className="gap-6 ">
      {inputs.map((input, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-3 mt-4 "
        >
          <div>
            <label
              htmlFor="note"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Name<span className="text-red-500">*</span>
            </label>
            <select
              name="product_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={input.product_id}
              onChange={(e) =>
                handleChange(index, "product_id", e.target.value)
              }
            >
              <option value="">Select Product</option>
              {product?.map((item) => (
                <option key={item.product_id} value={item.product_id}>
                  {item.product_id + "-" + item.product_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="qty"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qty<span className="text-red-500">*</span>
            </label>
            <input
              name="qty"
              placeholder="Qty"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              value={input.qty}
              onChange={(e) => handleChange(index, "qty", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="discount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Discount (%)
            </label>
            <input
              type="text"
              id="discount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Discount"
              value={input.discount}
              onChange={(e) => handleChange(index, "discount", e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="ppn"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              PPN (%)<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ppn"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="PPN"
              value={input.ppn}
              onChange={(e) => handleChange(index, "ppn", e.target.value)}
              required
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="pph"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              PPH (%)<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pph"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="PPH"
              value={input.pph}
              onChange={(e) => handleChange(index, "pph", e.target.value)}
              required
              disabled
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
      ))}
    </div>
  );
}

export default AddProductRepeater;
