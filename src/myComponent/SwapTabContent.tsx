import { useState } from "react";

function SwapTabContent() {
  const [selectedCurrency1, setSelectedCurrency1] = useState("WETH");
  const [selectedCurrency2, setSelectedCurrency2] = useState("SUSHI");
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [isCrossChain, setIsCrossChain] = useState(false);

  const currencies = [
    {
      name: "WETH",
      logo: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-cool-sphere-1170x780.jpg",
    },
    {
      name: "SUSHI",
      logo: "https://cryptologos.cc/logos/sushi-sushi-logo.png",
    },
    {
      name: "USDC",
      logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    },
    { name: "BTC", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  ];

  return (
    <div className="space-y-1 bg-gray-100 mt-[-18px] ">
      <div className="">
        <div className="flex justify-between items-center mb-2 mt-6 w-full py-2 bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-md">
          <div className="flex gap-2 flex-col p-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-purple-700 font-medium text-nowrap">
              Cross Chain
            </span>
            <p className="text-sm text-white text-[14px] font-semibold">
              Swap tokens from one network to another.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={isCrossChain}
              onChange={() => setIsCrossChain(!isCrossChain)}
            />
            <div className="w-10 h-5 bg-gray-200 rounded-full shadow-inner"></div>
            <div
              className={`absolute left-1 top-1 w-3 h-3 bg-blue-500 rounded-full shadow transition-transform ${
                isCrossChain ? "translate-x-5" : ""
              }`}
            ></div>
          </label>
        </div>
      </div>

      {/* Input 1 */}
      <div className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <input
            type="number"
            placeholder="0"
            value={amount1}
            onChange={(e) => setAmount1(e.target.value)}
            className="w-full bg-transparent text-lg font-medium outline-none"
          />
          <select
            value={selectedCurrency1}
            onChange={(e) => setSelectedCurrency1(e.target.value)}
            className="flex items-center ml-2 px-3 py-2 text-gray-700 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-blue-300"
          >
            {currencies.map((currency) => (
              <option key={currency.name} value={currency.name}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <p className="font-bold">${amount1 || "0.00"}</p>
          <button className="text-blue-500 flex items-center">
            <img
              src="https://cryptologos.cc/logos/wallet-icon.png"
              alt="wallet"
              className="w-4 h-4 mr-1 "
            />
            0.00
          </button>
        </div>
      </div>

      {/* Blue Arrow */}
      <div className="flex justify-center items-center">
        <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L9 15.586V4a1 1 0 112 0v11.586l3.293-3.293a1 1 0 011.414 1.414l-5 5A1 1 0 0110 18z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Input 2 */}
      <div className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <input
            type="number"
            placeholder="0"
            value={amount2}
            onChange={(e) => setAmount2(e.target.value)}
            className="w-full bg-transparent text-lg font-medium outline-none"
          />
          <select
            value={selectedCurrency2}
            onChange={(e) => setSelectedCurrency2(e.target.value)}
            className="flex items-center ml-2 px-3 py-2 text-gray-700 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-blue-300"
          >
            {currencies.map((currency) => (
              
              <option key={currency.name} value={currency.name}>
           {currency.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <p className="font-bold">${amount2 || "0.00"}</p>
          <button className="text-blue-500 flex items-center">
            <img
              src="https://cryptologos.cc/logos/wallet-icon.png"
              alt="wallet"
              className="w-4 h-4 mr-1"
            />
            0.00
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwapTabContent;
