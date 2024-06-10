// App.jsx
import React, { useState } from "react";
import Counter from "./Counter";

import rowOneImage from "./assets/row1.png";
import rowTwoImage from "./assets/row2.png";

const App = () => {
  const [orderList, setOrderList] = useState([
    { name: "MAGURO", quantity: 0, time: 10 },
    { name: "SAKE", quantity: 0, time: 20 },
    { name: "MASAGO", quantity: 0, time: 30 },
    { name: "MAKI", quantity: 0, time: 40 },
    { name: "TAMAGO", quantity: 0, time: 50 },
    { name: "TAKO", quantity: 0, time: 60 },
  ]);

  const [orderQueue, setOrderQueue] = useState([]);

  const increment = (name) => {
    setOrderList(
      orderList.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (name) => {
    setOrderList(
      orderList.map((item) =>
        item.name === name && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleOrder = () => {
    const currentOrder = orderList.filter((item) => item.quantity > 0);
    const totalTime = currentOrder.reduce((sum, item) => sum + item.quantity * item.time, 0);
    const currentOrderList = { order: currentOrder, totalTime };
    const currentOrderQueue = orderQueue.concat(currentOrderList);

    if (currentOrder.length !== 0) setOrderQueue(currentOrderQueue);

    setOrderList([
      { name: "MAGURO", quantity: 0, time: 10 },
      { name: "SAKE", quantity: 0, time: 20 },
      { name: "MASAGO", quantity: 0, time: 30 },
      { name: "MAKI", quantity: 0, time: 40 },
      { name: "TAMAGO", quantity: 0, time: 50 },
      { name: "TAKO", quantity: 0, time: 60 },
    ]);
  };

  return (
    <div className="flex flex-col h-screen w-screen lg:flex-row bg-[#0F3F71]">
      <div className="w-1/12"></div>
      <div className=" grow h-full bg-white rounded-2xl place-items-center flex flex-row justify-end">
        <div className="w-4/12 h-full flex flex-col px-8 pt-8 pb-4">
          <div className="text-[2.75rem] font-rammetto font-semibold drop-shadow-lg mb-3">
            <span className="text-[#F43D4A]">Mika</span>
            <span className="text-[#F4A03D]">Sushi</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <img src={rowOneImage} alt="" />
            <div className="flex flex-row justify-center gap-x-3">
              {orderList.slice(0, 3).map((item) => (
                <Counter
                  key={item.name}
                  item={item}
                  increment={increment}
                  decrement={decrement}
                />
              ))}
            </div>
            <img src={rowTwoImage} alt="" />
            <div className="flex flex-row justify-center gap-x-3">
              {orderList.slice(3).map((item) => (
                <Counter
                  key={item.name}
                  item={item}
                  increment={increment}
                  decrement={decrement}
                />
              ))}
            </div>
            <button
              className="mt-10 w-full bg-[#364E7B] border-none rounded-3xl h-28 btn font-rammetto font-bold text-white text-3xl"
              onClick={handleOrder}
            >
              Add To Queue
            </button>
          </div>
        </div>
        <div className="w-[933.78px] h-full bg-[#FCBA26] rounded-l-2xl grid grid-cols-2 gap-8 px-16 pt-16 overflow-y-auto">
          {orderQueue.map((queue, index) => (
            <div
              key={index}
              className="flex flex-col h-[32rem] bg-[#E1A530] rounded-3xl justify-between"
            >
              <div className="bg-[#CE911B] h-[7.25rem] rounded-3xl drop-shadow-lg font-rammetto font-bold text-4xl text-white flex items-center p-8">
                Order #{index + 1}
              </div>
              <div className="grow h-96 flex flex-col">
                {queue.order.map((order, orderIndex) => (
                  <div
                    key={orderIndex}
                    className="w-full h-14 text-white font-staatliches text-4xl flex flex-row justify-between drop-shadow-lg py-6 px-8"
                  >
                    <span>{order.quantity} X</span>
                    <span>{order.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-row h-32 justify-between bg-[#F9BB43] rounded-3xl drop-shadow-lg space-x-3 p-4">
                <div className="bg-[#CE911B] h-full w-[9.75rem] text-4xl text-white font-staatliches rounded-2xl items-center flex drop-shadow-lg justify-center">
                  TIME: {queue.totalTime} <span className="pl-1 text-3xl flex flex-col justify-end">s</span>
                </div>
                <div className="bg-[#E88D44] h-full w-[12rem] text-[2.5rem] text-[#8B4F1F] font-staatliches rounded-2xl items-center flex drop-shadow-lg justify-center">
                  DONE: s
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
