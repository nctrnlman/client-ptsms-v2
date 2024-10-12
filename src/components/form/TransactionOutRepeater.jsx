import { useState, useEffect } from "react";
import { RiCloseCircleLine, RiAddLine } from "react-icons/ri";
import Select from "react-select";
import { formatCurrency, removeCurrencyFormat } from "../../utils/converter";

function TransactionOutRepeater({ product, setProduct, formData }) {
  const [inputs, setInputs] = useState([
    {
      product_id: "",
      qty: 0,
      price: "",
      discount: "",
      ppn: "",
      pph: "",
      cn_type: "",
      cn: "",
      productTotalPrice: "",
    },
  ]);

  const calculateTotalPrice = (input) => {
    const price = parseFloat(removeCurrencyFormat(input.price)) || 0;
    const qty = parseFloat(input.qty) || 0;
    const discount = parseFloat(input.discount) || 0;
    const ppn = parseFloat(input.ppn) || 0;
    const pph = parseFloat(input.pph) || 0;

    const totalBeforeTax = price * qty * (1 - discount / 100);
    const totalWithPpn = totalBeforeTax * (1 + ppn / 100);
    const totalPrice = totalWithPpn * (1 + pph / 100);

    return totalPrice.toFixed(2);
  };

  const handleChange = (index, name, value) => {
    const newInputs = [...inputs];

    if (name === "price") {
      const priceWithoutFormat = removeCurrencyFormat(value);
      newInputs[index][name] = formatCurrency(priceWithoutFormat);
    } else if (name === "cn_type") {
      newInputs[index][name] = value;
      newInputs[index]["cn"] = "";
    } else if (name === "cn" && newInputs[index]["cn_type"] === "Nominal") {
      const priceWithoutFormat = removeCurrencyFormat(value);
      newInputs[index][name] = formatCurrency(priceWithoutFormat);
    } else {
      newInputs[index][name] = value;
    }

    // Calculate total price
    newInputs[index]["productTotalPrice"] = calculateTotalPrice(
      newInputs[index]
    );

    setInputs(newInputs);
    setProduct((prevData) => ({
      ...prevData,
      productList: newInputs,
    }));
  };

  const handleAddInput = () => {
    setInputs([
      {
        product_id: "",
        qty: 0,
        price: "",
        discount: "",
        ppn: "",
        pph: "",
        cn: "",
        cn_type: "",
        productTotalPrice: "",
      },
      ...inputs,
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
          newInputs[index]["price"] = selectedProduct.price;
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
          price: productItem.price,
          discount: productItem.discount,
          ppn: productItem.ppn,
          pph: productItem.pph,
          productTotalPrice: calculateTotalPrice(productItem),
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
                              (option) => option.product_id === input.product_id
                            ).product_id
                          } - ${
                            product.find(
                              (option) => option.product_id === input.product_id
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
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Rp. 0"
              value={input.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
              required
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
              type="number"
              id="discount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Discount"
              value={input.discount}
              onChange={(e) => handleChange(index, "discount", e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="ppn"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              PPN (%)
            </label>
            <input
              type="number"
              id="ppn"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="PPN"
              value={input.ppn}
              onChange={(e) => handleChange(index, "ppn", e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="pph"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              PPH (%)
            </label>
            <input
              type="number"
              id="pph"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="PPH"
              value={input.pph}
              onChange={(e) => handleChange(index, "pph", e.target.value)}
            />
          </div>
          {/* CN Type */}
          <div>
            <label
              htmlFor="cn_type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              CN Type
            </label>
            <Select
              id="cn_type"
              value={
                input.cn_type
                  ? {
                      value: input.cn_type,
                      label: input.cn_type,
                    }
                  : null
              }
              onChange={(selectedOption) =>
                handleChange(
                  index,
                  "cn_type",
                  selectedOption ? selectedOption.value : ""
                )
              }
              options={[
                { value: "Percentage", label: "Percentage" },
                { value: "Nominal", label: "Nominal" },
              ]}
              placeholder="CN Type"
              isClearable
            />
          </div>
          <div>
            <label
              htmlFor="cn"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              CN
            </label>
            <input
              type={input.cn_type === "Percentage" ? "number" : "text"}
              id="cn"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="CN"
              value={input.cn}
              onChange={(e) => handleChange(index, "cn", e.target.value)}
            />
          </div>
          <div className="flex flex- pt-4 text-2xl ">
            <p className="text-base">
              Total Price: Rp. {input.productTotalPrice}
            </p>
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
