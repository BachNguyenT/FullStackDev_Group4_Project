interface DropdownProps {
  placeholder: string;
  items: { text: string }[];
  valueSetter: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

function Dropdown({ placeholder, items, valueSetter, value }: DropdownProps) {
  return (
    <div className="relative inline-block text-left">
      <select
        value={value}
        onChange={(e) => valueSetter(e.target.value)}
        className="
          w-full rounded-md border border-gray-300 shadow-sm
          px-4 py-2 bg-white text-sm font-medium text-gray-700
          focus-within:border-gray-600
        "
      >
        <option value="" disabled className="text-black font-semibold">
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
}

export default Dropdown;
