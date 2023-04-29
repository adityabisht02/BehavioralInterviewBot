import React from "react";

function Report(reportdata) {
  return (
    <div className=" bg-slate-700 h-screen p-10">
      <div className="bg-white container m-5 p-5">
        <h1 className="font-bold text-2xl text-center">
          Your Performance Report
        </h1>
        <p className="text-xl mt-5">Q1. Talk about your strengths</p>
        <p>U have good answer, but underconfident</p>
      </div>

      <div className="bg-white container m-5 p-5">
        <h1 className="font-bold text-2xl text-center">Body language report</h1>
      </div>
    </div>
  );
}

export default Report;
