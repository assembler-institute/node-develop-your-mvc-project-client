import React from "react";
import { useProducts } from "../../context/products/reducer";

export default function CategoryBar() {
  const { selectCategory } = useProducts();

  function handleCategory(selection) {
    selectCategory(selection);
  }
  return (
    <div className="mx-auto px-4 sm:px-6 flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
      <button
        value={"men's clothing"}
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        onClick={(e) => handleCategory(e.target.value)}
      >
        Men&lsquo;s Clothing
      </button>
      <button
        value={"women's clothing"}
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        onClick={(e) => handleCategory(e.target.value)}
      >
        Women&lsquo;s Clothing
      </button>
      <button
        value={"electronics"}
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        onClick={(e) => handleCategory(e.target.value)}
      >
        Electronics
      </button>
      <button
        value={"jewelery"}
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        onClick={(e) => handleCategory(e.target.value)}
      >
        Jewelerey
      </button>
    </div>
  );
}
