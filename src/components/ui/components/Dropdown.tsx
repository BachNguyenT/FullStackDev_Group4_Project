import React, { useState } from "react";

interface DropdownItem {
  text: string;
}

interface DropdownProps {
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  // `sort` will always reflect the currently selected item's text
  const [sort, setSort] = useState<string>(items[0]?.text || "");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    // now `sort` === the selected option's text
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={sort}
        onChange={handleChange}
        className="
          w-full rounded-md border border-gray-300 shadow-sm
          px-4 py-2 bg-white text-sm font-medium text-gray-700
          hover:bg-gray-50 focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
        "
      >
        <option value="" disabled>
          Select an option
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
