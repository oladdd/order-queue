// Counter.jsx
import React from "react";

const Counter = ({ item, increment, decrement }) => {
  return (
    <div className="flex flex-col w-1/3 items-center mb-12">
      <div className="text-[#6B5555] text-4xl font-staatliches">
        {item.name}
      </div>
      <div className="bg-[#364E7B] rounded-xl h-16 w-full flex flex-row items-center justify-center px-1 py-3">
        <button
          className="btn w-0 h-0 bg-[#364E7B] border-none text-4xl text-white font-rammetto"
          onClick={() => decrement(item.name)}
        >
          -
        </button>
        <div className="flex w-full h-full bg-[#E9E9E9] rounded-md items-center countdown justify-center text-[#0F316E] text-2xl font-rammetto">
          {item.quantity}
        </div>
        <button
          className="btn w-0 h-0 bg-[#364E7B] py-0 border-none text-4xl text-white font-rammetto"
          onClick={() => increment(item.name)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
