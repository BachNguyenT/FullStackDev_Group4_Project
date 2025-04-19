import React from "react";


function Dropdown ({ placeholder, items, valueSetter }) {

  const handleChange = (selectedItem) => {
    valueSetter(selectedItem);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        onChange={(e) => handleChange(e.target.selectedIndex - 1)}
        className="
          w-full rounded-md border border-gray-300 shadow-sm
          px-4 py-2 bg-white text-sm font-medium text-gray-700
          hover:bg-gray-50 focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
        "
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {items.map((item, idx) => (
          <option key={idx} value={item.text}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
