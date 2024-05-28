import React from "react";
import Tabs from "./Tabs";
function TopContainer({ tab, setTab }) {
  return (
    <div className="relative block mt-5 w-full lg:h-[22vh] sm:h-[25vh] h-[28vh]">
      <div className={`break-before-all flex flex-row h-[10vh] `}>
        <div className="w-[75%] flex justify-end items-end float-right">
          <h1
            className={`w-auto capitalize text-center font-[Roboto-Bold] text-[25px] sm:text-[30px] md:text-[40px] lg:text-[48px]`}
          >
            Break even analysis calculator
          </h1>
        </div>
        <div className={`w-[20%] mt-2 flex justify-start items-center ml-[1%]`}>
          <Tabs tab={tab} setTab={setTab} />
        </div>
      </div>

      <div className="ml-1 mb-3 sm:w-[75%] p-1 justify-end items-center mt-4 flex relative ">
        <p className="relative xl:w-[61.5%] lg:w-[70%] md:w-[85%] w-auto text-center justify-center items-center text-sm md:text-md font-[SF-Pro-Display]">
          Finding your break-even point answers one of the most important
          questions for any business. When will it start making a profit?The
          break-even point calculates the number of units(or the amount of
          sales) that an organization needs to make for cost to equal income
        </p>
      </div>
    </div>
  );
}

export default TopContainer;
