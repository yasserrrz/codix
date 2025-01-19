import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = ({
  className = "",
  label,
  error,
  options = [],
  fullWidth = true,
  onChange,
  value,
  name,
  dropdownRef,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownWrapperRef = useRef(null);
  const dropdownValue =
    options.find((option) => option.id === value)?.label || "Select an option";

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (name, option) => {
    if (onChange) {
      onChange(name, option);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownWrapperRef.current &&
      !dropdownWrapperRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownClasses = `
    block w-full rounded-lg border px-4 py-2.5 cursor-pointer 
    text-gray-900 placeholder:text-gray-400 
    focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
    disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
    ${
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-200"
    }
    ${className}
  `;

  const wrapperClasses = `
    relative
    ${fullWidth ? "w-full" : "w-auto"}
  `;

  const menuClasses = `
    absolute z-[9999] mt-2 max-h-48 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg
    transition-opacity duration-200 ${
      isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
    }
    origin-top
  `;

  const menuItemClasses = `
    px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer
  `;

  const iconClasses = `
    h-5 w-5 text-gray-400 transition-transform duration-200
    ${isOpen ? "rotate-180" : "rotate-0"}
  `;

  return (
    <div className={wrapperClasses} ref={dropdownWrapperRef}>
      {label && (
        <label className="mb-1.5 block text-base font-bold  text-[#323F49]">
          {label}
        </label>
      )}
      <div className={dropdownClasses} onClick={toggleDropdown} {...props}>
        <div className="flex justify-between items-center">
          <span
            className={
              dropdownValue === "Select an option" ? "text-gray-400" : ""
            }
          >
            {dropdownValue}
          </span>
          <IoIosArrowDown className={iconClasses} />
        </div>
      </div>
      <ul className={menuClasses}>
        {options.map((option) => (
          <li
            key={option.id}
            className={menuItemClasses}
            onClick={() => handleSelect(name, option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Dropdown;
