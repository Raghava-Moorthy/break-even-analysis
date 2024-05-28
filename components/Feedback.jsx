import React from "react";

function Feedback() {
  return (
    <>
      <div className="bottom-0 font-[Source-Sans-Pro-Medium] flex md:flex-row flex-col w-[100%] h-auto md:h-[9vh] bg-[#333333] text-center justify-center items-center place-items-center ">
        <p className="m-2 p-1 w-auto text-white">
          Take a moment to share your experience on our website
        </p>
        <button
          className="ml-1 w-[130px] md:w-[12%] lg:w-[10%] mb-2 bg-white font-[Source-Sans-Pro] h-[5vh] rounded-md cursor-not-allowed"
          disabled
        >
          FeedBack
        </button>
      </div>
    </>
  );
}

export default Feedback;
