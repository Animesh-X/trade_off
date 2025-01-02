import React, { useState } from "react";
import SwapTabContent from "./myComponent/SwapTabContent";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import LimitTabContent from "./myComponent/LimitTabContent";
import Navbar from "./myComponent/Navbar";

function RateComponent() {
  return (
    <div className=" mt-2
    ">
      <p className="text-gray-400 text-sm">
        <span className="font-semibold text-gray-500">1 SUSHI</span> 
        <span className="text-gray-500"> ($1.10969) =</span> 
        <span className="font-semibold text-gray-500"> 0.0005975 WETH</span> 
        <span className="text-gray-400 "> ($1857.31)</span>
      </p>
    </div>
  );
}

function App() {
  return (
  <>
  <Navbar />
    <div className="min-h-screen  flex items-center justify-center px-4 bg-gray-100">
        
      <div className="  rounded-lg w-full max-w-md  ">
        <div className="bg-white  rounded-md p-2">

     
        <h1 className="text-2xl font-semibold text-gray-800 ">Trade</h1>
        <RateComponent />
      
        </div>
        <TabbedComponent />
        <button className="mt-2 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          <div className="flex justify-center items-center w-full">
            <ConnectButton />
          </div>
        </button>
      </div>
    </div></>
  );
}

export default App;


// Tabbed component
function TabbedComponent() {
  const [activeTab, setActiveTab] = useState("Swap");

  return (
    <div >
      <div className="flex border-b mb-1 bg-white  rounded-md ">
        <button
          className={`flex-1 text-center py-2 ${
            activeTab === "Swap"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Swap")}
        >
          Uniswap
        </button>
        <button
          className={`flex-1 text-center py-2 ${
            activeTab === "Limit"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Limit")}
        >
          Pancake Swap
        </button>
      </div>
      {activeTab === "Swap" && <SwapTabContent/>}
      {activeTab === "Limit" && <LimitTabContent />}
    </div>
  );
}

// Main App

