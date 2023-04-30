import React from "react";
import { useLocation } from "react-router-dom";
function Report() {
  const location = useLocation();
  const quesresponse = location.state;

  return (
    <div className=" bg-slate-700 h-full p-10">
      <div className="bg-white container m-5 p-5">
        <h1 className="font-bold text-2xl text-center underline">
          Your Performance Report
        </h1>
        {console.log(quesresponse)}
        {quesresponse &&
          quesresponse.map(async (item, index) => (
            <div key={index} className="p-4">
              <p className="text-xl mt-5 font-bold">Q: {item.question}</p>
              <p className="text-xl mt-5 font-bold">Your response : </p>
              {item.response}
              <p className="text-xl mt-5 font-bold">Feedback : </p>
              {await item.feedback}
            </div>
          ))}
      </div>

      <div className="bg-white container m-5 p-5">
        <h1 className="font-bold text-2xl text-center underline">
          Body language report
        </h1>
      </div>
    </div>
  );
}

export default Report;
