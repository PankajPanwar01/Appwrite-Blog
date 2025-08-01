import React from "react";
import PropTypes from "prop-types"; // Optional: prop validation

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-5 py-2 rounded-full font-medium shadow-md 
            transition-all duration-300 ease-in-out 
            hover:scale-105 hover:shadow-lg 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 
            ${bgColor} ${textColor} 
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
