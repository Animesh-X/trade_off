import React from "react";

function Navbar() {
  return (
    <nav className="bg-gray-100 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center">
            {/* Logo and Title */}
            <div className="flex items-center gap-2">
              <img
                src="https://cryptologos.cc/logos/sushi-sushi-logo.png"
                alt="Trade Off Logo"
                className="w-8 h-8"
              />
  <span className="bg-clip-text text-2xl text-transparent bg-gradient-to-r from-pink-700 to-purple-700 font-medium text-nowrap">
              Trade OFF
            </span>            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Network Icon */}
          

            {/* Connect Wallet Button */}
            <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium rounded-md">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
