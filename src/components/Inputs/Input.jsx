import React from "react";
import { BiCalendar } from "react-icons/bi";

import { TiAttachment } from "react-icons/ti";


const Input = ({
  className = "",
  label,
  error,
  type = "text",
  icon,
  fullWidth = true,
  fileName,
  onChange,
  value,
  name,
  ...props
}) => {
  const inputClasses = `
    block w-full rounded-lg border px-4 py-2.5 
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

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const renderInput = () => {
    switch (type) {
      case "date":
        return (
          <div className="relative">
            <input
              {...props}
              type="date"
              className={inputClasses}
              onChange={handleChange}
              value={value}
              name={name}
            />
          </div>
        );
        case "file":
          { const uniqueId = props.id || `file-input-${name}`;
          return (
            <div className="relative">
              {/* Hidden input */}
              <input
                {...props}
                type="file"
                className="hidden"
                name={name}
                id={uniqueId} // Unique id for each file input
                onChange={handleChange}
              />
              {/* Visible label */}
              <label
                htmlFor={uniqueId} // Match label to unique input id
                className={`${inputClasses} cursor-pointer flex items-center`}
              >
                <span className="truncate">{fileName || "Choose file..."}</span>
                <TiAttachment className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </label>
            </div>
          ); }
        
      default:
        return (
          <div className="relative">
            <input
              {...props}
              type={type}
              className={inputClasses}
              onChange={handleChange}
              value={value}
              name={name}
            />
            {icon && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {icon}
              </span>
            )}
          </div>
        );
    }
  };

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="mb-1.5 block text-base font-bold  text-[#323F49]">
          {label}
        </label>
      )}
      {renderInput()}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
