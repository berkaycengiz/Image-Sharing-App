import React, { useState } from "react";

const SliderCheckbox = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="inline-flex overflow-hidden items-center gap-2">
      <label className="cursor-pointer">
        <input 
          type="checkbox"
          checked={checked}
          id="rememberMe"
          onChange={handleChange}
          className="hidden"
        />
        <span
            className={`w-13 h-7 rounded-full flex items-center justify-between p-1 transition-all ease-in-out duration-400 ${
              checked ? "bg-secondary" : "bg-gray-400"
            }`}>
            <span
              className={`w-5 h-5 bg-white rounded-full transition-transform duration-400 ${
                checked ? "transform translate-x-6" : ""
              }`}>
              </span>
          </span>
      </label>  
      <span className="text-sm font-normal font-display text-secondary">
        Remember me
      </span>
    </div>
  );
};

export default SliderCheckbox;
