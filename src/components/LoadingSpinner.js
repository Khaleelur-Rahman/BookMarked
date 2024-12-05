import React from "react";
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center my-20">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
