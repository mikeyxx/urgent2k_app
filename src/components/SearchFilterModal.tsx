"use client";

import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

interface FilterProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchFilterModal({ setIsVisible }: FilterProps) {
  const [categoryDropDown, setCategoryDropDown] = useState(false);
  const [isHourlyChecked, setIsHourlyChecked] = useState(false);
  const [isFixedPriceChecked, setIsFixedPriceChecked] = useState(false);
  const [one, setOne] = useState(false);
  const [oneToThree, setOneToThree] = useState(false);
  const [threeToSix, setThreeToSix] = useState(false);
  const [moreThanSix, setMoreThanSix] = useState(false);

  const handleCategoryDropDown = () => {
    setCategoryDropDown(true);
  };

  const closeModal = () => {
    setIsVisible(false);

    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black/50 flex-center py-28 w-full h-full overflow-auto"
    >
      <div className="bg-white mt-28 p-8 rounded-xl h-fit flex flex-col justify-between w-[90%] relative">
        <button
          className="absolute right-8 cursor-pointer"
          onClick={closeModal}
        >
          ✖
        </button>
        <div className="flex flex-wrap gap-8 border-b-2 pb-8">
          <div>
            <h4 className="mb-4">Category</h4>
            <div>
              <form
                className="flex justify-between rounded-xl transition-all duration-300 w-full border border-gray-600 relative"
                onFocus={handleCategoryDropDown}
              >
                <input
                  type="text"
                  placeholder="Search categories"
                  className="border-0 w-full h-7 p-2 focus:outline-none rounded-tl-xl text-sm rounded-bl-xl transition duration-300"
                />

                <button type="submit" className="rounded-r-xl">
                  <BsSearch className="text-xl mx-4 place-self-center " />
                </button>
              </form>

              {categoryDropDown && (
                <div className="absolute bg-white z-20 shadow-xl w-[26%] mt-5 p-5 rounded-lg transition-all duration-300 h-48 overflow-scroll">
                  <ul className="flex flex-col gap-3 transition-all duration-300">
                    <li>Service One</li>
                    <li>Service Two</li>
                    <li>Service Three</li>
                    <li>Service Four</li>
                    <li>Service Five</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="">Job Type</h3>

            <div className="transition-all duration-300">
              <div className="flex flex-col gap-4">
                <label htmlFor="hour" className="flex items-center gap-3">
                  <input
                    id="hour"
                    type="checkbox"
                    onChange={() => setIsHourlyChecked((prev) => !prev)}
                    className={`appearance-none border border-gray-500 w-6 h-5 rounded-md outline-none cursor-pointer ${
                      isHourlyChecked ? "checked" : ""
                    }`}
                  />
                  <span>Hourly</span>
                </label>
                <label htmlFor="fixed" className="flex items-center gap-3">
                  <input
                    id="fixed"
                    type="checkbox"
                    onChange={() => setIsFixedPriceChecked((prev) => !prev)}
                    className={`appearance-none border border-gray-500 w-6 h-5 rounded-md outline-none cursor-pointer ${
                      isFixedPriceChecked ? "checked" : ""
                    }`}
                  />
                  <span>Fixed Prices</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3>Project Length</h3>

            <div className="transition-all duration-300">
              <div className="flex flex-col gap-4">
                <label htmlFor="one" className="flex items-center gap-3">
                  <input
                    id="one"
                    type="checkbox"
                    onChange={() => setOne((prev) => !prev)}
                    className={`appearance-none border border-gray-500 w-8 h-7 rounded-lg outline-none cursor-pointer ${
                      one ? "checked" : ""
                    }`}
                  />
                  <span>Less than one month</span>
                </label>
                <label htmlFor="onetothree" className="flex items-center gap-3">
                  <input
                    id="onetothree"
                    type="checkbox"
                    onChange={() => setOneToThree((prev) => !prev)}
                    className={`appearance-none border border-gray-500 w-8 h-7 rounded-lg outline-none cursor-pointer ${
                      oneToThree ? "checked" : ""
                    }`}
                  />
                  <span>1 - 3 months</span>
                </label>
                <label htmlFor="threeToSix" className="flex items-center gap-3">
                  <input
                    id="threeToSix"
                    type="checkbox"
                    onChange={() => setThreeToSix((prev) => !prev)}
                    className={`appearance-none border border-gray-500 w-8 h-7 rounded-lg outline-none cursor-pointer ${
                      threeToSix ? "checked" : ""
                    }`}
                  />
                  <span>3 - 6 Months</span>
                </label>
                <label
                  htmlFor="morethansix"
                  className="flex items-center gap-3"
                >
                  <input
                    id="morethansix"
                    type="checkbox"
                    onChange={() => setMoreThanSix((prev) => !prev)}
                    className={`appearance-none border border-gray-500 w-8 h-7 rounded-lg outline-none cursor-pointer ${
                      moreThanSix ? "checked" : ""
                    }`}
                  />
                  <span>More than six months</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button className="w-full p-3 rounded-2xl">Clear</button>
          <button className="bg-primary w-full p-3 rounded-2xl text-white cursor-pointer">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchFilterModal;
