"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import SearchFilterModal from "./SearchFilterModal";

interface FilterProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function Filters({ isVisible, setIsVisible }: FilterProps) {
  const [dropdownOption1, setDropdownOption1] = useState(false);
  const [dropdownOption2, setDropdownOption2] = useState(false);
  const [dropdownOption3, setDropdownOption3] = useState(false);
  const [categoryDropDown, setCategoryDropDown] = useState(false);
  const [isHourlyChecked, setIsHourlyChecked] = useState(false);
  const [isFixedPriceChecked, setIsFixedPriceChecked] = useState(false);
  const [one, setOne] = useState(false);
  const [oneToThree, setOneToThree] = useState(false);
  const [threeToSix, setThreeToSix] = useState(false);
  const [moreThanSix, setMoreThanSix] = useState(false);

  const handleDropdownOne = () => {
    setDropdownOption1((prev) => !prev);
    setDropdownOption2(false);
    setDropdownOption3(false);
  };

  useEffect(() => {
    if (dropdownOption1 === false) {
      setCategoryDropDown(false);
    }
  }, [dropdownOption1]);

  const handleDropdownTwo = () => {
    setDropdownOption2((prev) => !prev);
    setDropdownOption1(false);
    setDropdownOption3(false);
  };

  const handleDropdownThree = () => {
    setDropdownOption3((prev) => !prev);
    setDropdownOption1(false);
    setDropdownOption2(false);
  };

  const handleCategoryDropDown = () => {
    setCategoryDropDown(true);
  };

  return (
    <>
      <div className="w-[30%] px-4 xl:px-8 lg:flex flex-col hidden">
        <h2 className="text-xl mb-8">Filter By</h2>

        <div className="flex flex-col">
          <div
            className={`border-b-2 py-4 ${
              dropdownOption1 && "py-6"
            } transition-all duration-300`}
          >
            <div
              className={`flex justify-between items-center text-sm ${
                dropdownOption1 && "pb-4 transition-all duration-300"
              }`}
              onClick={handleDropdownOne}
            >
              <h3>Category</h3>
              {dropdownOption1 ? (
                <IoIosArrowUp className="text-lg text-primary cursor-pointer" />
              ) : (
                <IoIosArrowDown className="text-lg text-primary cursor-pointer" />
              )}
            </div>
            {dropdownOption1 && (
              <form
                className="flex justify-between rounded-xl transition-all duration-300 w-full border border-gray-600 relative"
                onFocus={handleCategoryDropDown}
              >
                <input
                  type="text"
                  placeholder="Search categories"
                  className="border-0 w-full px-2 py-1 focus:outline-none rounded-tl-xl text-sm rounded-bl-xl transition duration-300"
                />

                <button type="submit" className="rounded-r-xl">
                  <BsSearch className="mx-4 place-self-center " />
                </button>
              </form>
            )}

            {categoryDropDown && (
              <div className="absolute bg-white z-20 shadow-xl w-[26%] mt-5 p-5 rounded-lg transition-all duration-300">
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
          <div
            className={`border-b-2 py-4 ${
              dropdownOption2 && "py-6"
            } transition-all duration-300`}
          >
            <div
              className="flex justify-between items-center text-sm"
              onClick={handleDropdownTwo}
            >
              <h3>Job Type</h3>
              {dropdownOption2 ? (
                <IoIosArrowUp className="text-lg text-primary cursor-pointer" />
              ) : (
                <IoIosArrowDown className="text-lg text-primary cursor-pointer" />
              )}
            </div>

            {dropdownOption2 && (
              <div className="absolute bg-white z-20 shadow-xl w-[26%] mt-5 p-5 rounded-lg transition-all duration-300">
                <div className="flex flex-col gap-4 text-sm">
                  <label htmlFor="hour" className="flex items-center gap-3">
                    <input
                      id="hour"
                      type="checkbox"
                      onChange={() => setIsHourlyChecked((prev) => !prev)}
                      className={`appearance-none border border-gray-500 w-5 h-5 rounded-lg outline-none cursor-pointer ${
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
                      className={`appearance-none border border-gray-500 w-5 h-5 rounded-lg outline-none cursor-pointer ${
                        isFixedPriceChecked ? "checked" : ""
                      }`}
                    />
                    <span>Fixed Prices</span>
                  </label>
                </div>
              </div>
            )}
          </div>
          <div
            className={`border-b-2 py-4 ${
              dropdownOption2 && "py-6"
            } transition-all duration-300`}
          >
            <div
              className="flex justify-between items-center text-sm"
              onClick={handleDropdownThree}
            >
              <h3>Project Length</h3>
              {dropdownOption3 ? (
                <IoIosArrowUp className="text-lg text-primary cursor-pointer" />
              ) : (
                <IoIosArrowDown className="text-lg text-primary cursor-pointer" />
              )}
            </div>

            {dropdownOption3 && (
              <div className="absolute bg-white z-20 shadow-xl w-[26%] mt-5 p-5 rounded-lg transition-all duration-300">
                <div className="flex flex-col gap-4 text-sm">
                  <label htmlFor="one" className="flex items-center gap-3">
                    <input
                      id="one"
                      type="checkbox"
                      onChange={() => setOne((prev) => !prev)}
                      className={`appearance-none border border-gray-500 w-5 h-5 rounded-lg outline-none cursor-pointer ${
                        one ? "checked" : ""
                      }`}
                    />
                    <span>Less than one month</span>
                  </label>
                  <label
                    htmlFor="onetothree"
                    className="flex items-center gap-3"
                  >
                    <input
                      id="onetothree"
                      type="checkbox"
                      onChange={() => setOneToThree((prev) => !prev)}
                      className={`appearance-none border border-gray-500 w-5 h-5 rounded-lg outline-none cursor-pointer ${
                        oneToThree ? "checked" : ""
                      }`}
                    />
                    <span>1 - 3 months</span>
                  </label>
                  <label
                    htmlFor="threeToSix"
                    className="flex items-center gap-3"
                  >
                    <input
                      id="threeToSix"
                      type="checkbox"
                      onChange={() => setThreeToSix((prev) => !prev)}
                      className={`appearance-none border border-gray-500 w-5 h-5 rounded-lg outline-none cursor-pointer ${
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
                      className={`appearance-none border border-gray-500 w-5 h-5 rounded-lg outline-none cursor-pointer ${
                        moreThanSix ? "checked" : ""
                      }`}
                    />
                    <span>More than six months</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isVisible && <SearchFilterModal setIsVisible={setIsVisible} />}
    </>
  );
}

export default Filters;
