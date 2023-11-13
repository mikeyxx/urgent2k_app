"use client";
import React, { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

function InPageFilterComp() {
  const [isVisible, setIsVisible] = useState(false);

  const handleModalVisibility = () => {
    setIsVisible(true);

    document.body.style.overflow = "hidden"; // Re-enable scrolling
  };
  return (
    <div
      className="max-[400]:w-10 w-fit p-[10px] h-10 rounded-full border max-[1000px]:flex items-center justify-center gap-3 border-primary text-primary hidden"
      onClick={handleModalVisibility}
    >
      <IoFilterOutline className="text-lg" />
      <span className="text-sm sm:block hidden">Filters</span>
    </div>
  );
}

export default InPageFilterComp;
