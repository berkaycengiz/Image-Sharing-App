import React from "react";

interface CircleButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

const CircleButton: React.FC<CircleButtonProps> = ({ onClick, children }) => {

  return (
    <button
    type="button"
    onClick={onClick}
    className="w-10 font-display flex flex-col items-center self-center rounded-full bg-secondary text-white py-2 font-normal hover:bg-hover transition hover:cursor-pointer">
        {children}
    </button>
  );
};

export default CircleButton;