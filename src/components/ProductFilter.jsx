import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function ProductFilter({ filters, setFilters }) {
  const categories = ["mens-watches", "womens-watches"]; 
  const priceRanges = [
    { label: "Under $20", min: 0, max: 20 },
    { label: "$20 - $50", min: 20, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "Over $100", min: 100, max: Infinity },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === category ? null : category, 
    }));
  };

  const handlePriceChange = (priceRange) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: prev.priceRange === priceRange ? null : priceRange, 
    }));
  };

  // Toggle drawer visibility
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      
      <button
        className="sm:hidden text-2xl text-blue-800  p-1"
        onClick={toggleDrawer}
      >
        <FaBars />
      </button>

      
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-300 ${
          isDrawerOpen ? "block" : "hidden"
        }`}
        onClick={toggleDrawer}
      >
        <div
          className={`transform bg-white w-3/4 sm:w-1/3 h-full p-6 transition-all duration-300 ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          

          <h3 className="font-bold text-lg mb-6 text-blue-900">Filters</h3>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-md mb-2 text-blue-700">Category</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 ease-in-out ${
                    filters.category === category
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-blue-700"
                  } hover:bg-blue-400 hover:text-white focus:outline-none`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="font-medium text-md mb-2 text-blue-700">Price</h4>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => handlePriceChange(range)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 ease-in-out ${
                    filters.priceRange?.label === range.label
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-blue-700"
                  } hover:bg-blue-400 hover:text-white focus:outline-none`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel for Desktop (Always visible on larger screens) */}
      <div className="hidden sm:block bg-white shadow-lg p-6 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h3 className="font-bold text-lg mb-6 text-blue-900">Filters</h3>

        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="font-medium text-md mb-2 text-blue-700">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-300 ease-in-out ${
                  filters.category === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-blue-700"
                } hover:bg-blue-400 hover:text-white focus:outline-none`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="font-medium text-md mb-2 text-blue-700">Price</h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => handlePriceChange(range)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-300 ease-in-out ${
                  filters.priceRange?.label === range.label
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-blue-700"
                } hover:bg-blue-400 hover:text-white focus:outline-none`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
