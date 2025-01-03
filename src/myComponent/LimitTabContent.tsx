import { useState, useEffect, useRef } from "react";
import { routerAbi, erc20ABI } from "@/blockchain/abi";
import { JsonRpcProvider, Contract, parseUnits, formatUnits } from "ethers";
import { toast } from "react-hot-toast";

function LimitTabContent() {
  const [selectedCurrency1, setSelectedCurrency1] = useState(
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
  ); // Default address for USDC
  const [selectedCurrency2, setSelectedCurrency2] = useState(
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  ); // Default address for WBNB
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [isCrossChain, setIsCrossChain] = useState(false);
  const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currencies = [
    {
      name: "USDC",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    },
    {
      name: "WBNB",
      logo: "https://cryptologos.cc/logos/sushi-sushi-logo.png",
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    },
    {
      name: "DAI",
      logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
      address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    },
    {
      name: "USDT",
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      address: "0x55d398326f99059fF775485246999027B3197955",
    },
  ];

  // Fetch Price Function
  const fetchPrice = async (t0: string, t1: string, amount : any) => {
    try {
      console.log("Fetching Price for:", t0, t1);
      if(!amount) {
        return "0";
      }
      const provider = new JsonRpcProvider("https://bsc-dataseed1.binance.org/");
      const router = new Contract(routerAddress, routerAbi, provider);
  
      const token0 = new Contract(t0, erc20ABI, provider);
      const token1 = new Contract(t1, erc20ABI, provider);

      const decimal0 = await token0.decimals();
      const decimal1 = await token1.decimals();
  
      if (!decimal0 || !decimal1) {
        throw new Error("Unable to fetch token decimals");
      }
      
      console.log("Amount:", amount);
      
      const amt = parseUnits(amount.toString(), decimal0);
      console.log("Parsed Amount:", amt.toString());
      
      const amountsOut = await router.getAmountsOut(amt, [t0, t1]);
  
      const pr = formatUnits(amountsOut[1], decimal1);
      console.log("Fetched Price:", pr);
      return pr;
    } catch (error) {
      console.error("Error fetching price:", error);
      toast.error("Failed to fetch price");
      return "";
    }
  };

  const handleCurrency1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);

    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    fetchTimeoutRef.current = setTimeout(async () => {
      try {
        console.log("Fetching price...", price);
        console.log("Target:", e.target.value);
        
        const pr = await fetchPrice(selectedCurrency1, selectedCurrency2, e.target.value);
        setAmount(pr);
      } catch (error) {
        console.error("Failed to update price:", error);
      }
    }, 500); 
  };

  const handleCurrency2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);

    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    fetchTimeoutRef.current = setTimeout(async () => {
      try {
        console.log("Fetching price...", price);
        console.log("Target:", e.target.value);
        
        const pr = await fetchPrice(selectedCurrency2, selectedCurrency1, e.target.value);
        setPrice(pr);
      } catch (error) {
        console.error("Failed to update price:", error);
      }
    }, 500); 
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-1 bg-gray-100 mt-[-18px]">
      <div className="mb-4">
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

      {/* Price Input */}
      <div className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <input
            type="number"
            placeholder="Amount"
            value={price}
            onChange={(e) => handleCurrency1Change(e)}
            className="w-full bg-transparent text-lg font-medium outline-none"
          />
          <select
            value={selectedCurrency1}
            onChange={(e) => setSelectedCurrency1(e.target.value)}
            className="flex items-center ml-2 px-3 py-2 text-gray-700 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-blue-300"
          >
            {currencies.map((currency) => (
              <option key={currency.name} value={currency.address}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blue Arrow */}
      <div className="flex justify-center items-center">
        <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L9 15.586V4a1 1 0 112 0v11.586l3.293-3.293a1 1 0 011.414 1.414l-5 5A1 1 0 0110 18z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Amount Input */}
      <div className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => handleCurrency2Change(e)}
            className="w-full bg-transparent text-lg font-medium outline-none"
          />
          <select
            value={selectedCurrency2}
            onChange={(e) => setSelectedCurrency2(e.target.value)}
            className="flex items-center ml-2 px-3 py-2 text-gray-700 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-blue-300"
          >
            {currencies.map((currency) => (
              <option key={currency.name} value={currency.address}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default LimitTabContent;
