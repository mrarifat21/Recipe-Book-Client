import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  id,
  name,
  placeholder,
  className = "",
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputId = id || name;

  return (
    <div className="relative">
      <input
        id={inputId}
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        required={required}
        className={`input input-bordered w-full pr-12 z-0 ${className}`}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        aria-pressed={showPassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded z-10"
      >
        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </button>
    </div>
  );
};

export default PasswordInput;