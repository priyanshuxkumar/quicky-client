import React from "react";

const ProgressBar = () => {
  return (
    <div className={`relative w-full bg-white rounded`}>
      <div className="w-[100%] absolute top-0 h-[2px] rounded shim-progress"></div>
    </div> 
  );
};

export default ProgressBar;