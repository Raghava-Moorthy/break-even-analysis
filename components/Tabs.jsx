import React from "react";

function Tabs({ tab, setTab }) {
  return (
    <div className="flex justify-center text-center w-[100%] rounded-md flex-col lg:flex-row ">
      <button
        className={`${
          tab === "calculate" ? "bg-slate-200" : " bg-white"
        } font-[Source-Sans-Pro-Semi] ml-2 font-semibold rounded-2xl w-full p-1 mr-2 mt-2 mb-2 outline-none`}
        onClick={() => {
          setTab("calculate");
        }}
      >
        Analysis
      </button>

      <button
        className={`${
          tab === "history" ? "bg-slate-200" : " bg-white"
        } font-[Source-Sans-Pro-Semi] lg:ml-1 ml-2 font-semibold rounded-2xl w-full p-1 mr-2 mt-2 mb-2 outline-none`}
        onClick={() => {
          setTab("history");
        }}
      >
        History
      </button>
    </div>
  );
}

export default Tabs;
