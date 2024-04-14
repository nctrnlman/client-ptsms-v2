import { useState, useEffect } from "react";
import { RiCloseCircleLine, RiAddLine } from "react-icons/ri";

function TransactionOutRepeater({ product, setProduct }) {
  const [inputs, setInputs] = useState([
    {
      productName: "",
      productQty: 0,
      productPrice: "",
      productDisc: "",
      productPpn: "11%",
      productPph: "1.5%",
      productCn: "",
      productTotalPrice: "",
    },
  ]);

  const handleChange = (index, name, value) => {
    const newInputs = [...inputs];
    newInputs[index][name] = value;

    // Update product price if product is selected and quantity is filled
    if (name === "productQty" && value && newInputs[index]["productName"]) {
      const selectedProduct = product.find(
        (p) => p.product_id === parseInt(newInputs[index]["productName"])
      );
      if (selectedProduct) {
        newInputs[index]["productPrice"] =
          selectedProduct.price * parseInt(value);
      }
    }

    // Calculate total price
    const price = parseFloat(newInputs[index]["productPrice"]) || 0;
    const qty = parseFloat(newInputs[index]["productQty"]) || 0;
    const disc = parseFloat(newInputs[index]["productDisc"]) || 0;
    const ppn =
      parseFloat(newInputs[index]["productPpn"].replace("%", "")) || 0;
    const pph =
      parseFloat(newInputs[index]["productPph"].replace("%", "")) || 0;

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
        productName: "",
        productQty: 0,
        productPrice: "",
        productDisc: "",
        productPpn: "11%",
        productPph: "1.5%",
        productCn: "",
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
      if (input.productName && input.productQty) {
        const selectedProduct = product.find(
          (p) => p.product_id === parseInt(input.productName)
        );
        if (selectedProduct) {
          const newInputs = [...inputs];
          newInputs[index]["productPrice"] =
            selectedProduct.price * parseInt(input.productQty);
          setInputs(newInputs);
        }
      }
    });
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
              Product Name
            </label>
            <select
              name="productName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={input.productName}
              onChange={(e) =>
                handleChange(index, "productName", e.target.value)
              }
            >
              <option value="">Select Product</option>
              {product?.map((item) => (
                <option key={item.product_id} value={item.product_id}>
                  {item.product_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="productQty"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qty
            </label>
            <input
              name="productQty"
              placeholder="Qty"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              value={input.productQty}
              onChange={(e) =>
                handleChange(index, "productQty", e.target.value)
              }
            />
          </div>
          <div>
            <label
              htmlFor="productPrice"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="text"
              id="productPrice"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Price"
              value={input.productPrice}
              onChange={(e) =>
                handleChange(index, "productPrice", e.target.value)
              }
              required
            />
          </div>
          <div>
            <label
              htmlFor="productDisc"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Discount
            </label>
            <input
              type="text"
              id="productDisc"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Discount"
              value={input.productDisc}
              onChange={(e) =>
                handleChange(index, "productDisc", e.target.value)
              }
              required
            />
          </div>
          <div>
            <label
              htmlFor="productPpn"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              PPN
            </label>
            <input
              type="text"
              id="productPpn"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="PPN"
              value={input.productPpn}
              onChange={(e) =>
                handleChange(index, "productPpn", e.target.value)
              }
              required
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="productPph"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              PPH
            </label>
            <input
              type="text"
              id="productPph"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="PPH"
              value={input.productPph}
              onChange={(e) =>
                handleChange(index, "productPph", e.target.value)
              }
              required
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="productCn"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              CN
            </label>
            <input
              type="text"
              id="productCn"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="CN"
              value={input.productCn}
              onChange={(e) => handleChange(index, "productCn", e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="productPriceTax"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Total Price (Tax & Disc)
            </label>
            <input
              type="text"
              id="productTotalPrice"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Rp."
              value={input.productTotalPrice}
              onChange={(e) =>
                handleChange(index, "productTotalPrice", e.target.value)
              }
              required
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

export default TransactionOutRepeater;
