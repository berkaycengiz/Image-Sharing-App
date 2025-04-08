import React from "react";

interface SubmitButtonProps {
    children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => {

  return (
    <button
    type="submit"
    className="w-full font-display bg-secondary text-white py-2 rounded font-normal hover:bg-hover transition hover:cursor-pointer">
        {children}
    </button>
  );
};

export default SubmitButton;
