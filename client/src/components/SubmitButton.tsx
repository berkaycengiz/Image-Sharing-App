import React from "react";

interface SubmitButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, onClick, style }) => {

  return (
    <button
    type="submit"
    onClick={onClick}
    style={style}
    className="w-full font-display flex flex-col items-center bg-secondary text-white py-2 rounded font-normal hover:bg-hover transition cursor-pointer">
        {children}
    </button>
  );
};

export default SubmitButton;
