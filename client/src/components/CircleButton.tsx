import React from "react";

interface CircleButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const CircleButton: React.FC<CircleButtonProps> = ({ onClick, children, style }) => {

  return (
    <button
    type="button"
    onClick={onClick}
    style={style}
    className="w-10 h-10 font-display flex flex-col items-center self-center rounded-full bg-secondary text-white justify-center font-normal hover:bg-hover transition hover:cursor-pointer">
        {children}
    </button>
  );
};

export default CircleButton;