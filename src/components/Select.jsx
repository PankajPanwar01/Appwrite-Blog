import React, { useId } from "react";

const Select = React.forwardRef(function Select(
  {
    options = [],
    label,
    className = "",
    placeholder = "Select an option",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`px-4 py-2 rounded-xl bg-white text-gray-800 
            border border-gray-300 shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
            transition duration-200 ease-in-out 
            placeholder-gray-400 w-full ${className}`}
        {...props}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) =>
          typeof option === "string" ? (
            <option key={option} value={option}>
              {option}
            </option>
          ) : (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
});

export default Select;
