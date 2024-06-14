import React, { useState, useEffect, useRef } from "react";
import Counter from "./Counter";
import Countdown from "./Countdown";
import Countup from "./Countup";

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
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = useRef(1);

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
    const totalTime = currentOrder.reduce(
      (sum, item) => sum + item.quantity * item.time,
      0
    );
    const currentOrderList = {
      order: currentOrder,
      totalTime,
      elapsedTime: 0,
      completed: false,
      orderId: count.current,
    };
    const currentOrderQueue = orderQueue.concat(currentOrderList);

    count.current += 1;

    if (currentOrder.length !== 0) {
      const sortedOrderQueue = currentOrderQueue.sort(
        (a, b) => a.totalTime - b.totalTime
      );
      setOrderQueue(sortedOrderQueue);
      setCurrentOrderIndex(0); // Reset current order index when a new order is added
      setPaused(false); // Resume Countup when a new order is added
    }

    console.log(currentOrderList);

    setOrderList([
      { name: "MAGURO", quantity: 0, time: 10 },
      { name: "SAKE", quantity: 0, time: 20 },
      { name: "MASAGO", quantity: 0, time: 30 },
      { name: "MAKI", quantity: 0, time: 40 },
      { name: "TAMAGO", quantity: 0, time: 50 },
      { name: "TAKO", quantity: 0, time: 60 },
    ]);
  };

  const handleTimeUpdate = (newTime) => {
    setOrderQueue((prevQueue) => {
      const updatedQueue = [...prevQueue];
      if (updatedQueue.length > 0) {
        updatedQueue[currentOrderIndex] = {
          ...updatedQueue[currentOrderIndex],
          totalTime: newTime,
        };
      }
      return updatedQueue;
    });
  };

  const handleComplete = () => {
    console.log("handleComplete called");
    setOrderQueue((prevQueue) => {
      const updatedQueue = [...prevQueue];
      if (updatedQueue.length > 0) {
        updatedQueue[currentOrderIndex] = {
          ...updatedQueue[currentOrderIndex],
          completed: true,
        };
      }
      return updatedQueue;
    });
    setCurrentOrderIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= orderQueue.length) {
        setPaused(true); // Pause Countup when all orders are complete
      }
      return newIndex;
    });
  };

  const updateElapsedTime = () => {
    setOrderQueue((prevQueue) => {
      const updatedQueue = prevQueue.map((item, index) =>
        !item.completed ? { ...item, elapsedTime: item.elapsedTime + 1 } : item
      );
      return updatedQueue;
    });
  };

  useEffect(() => {
    if (!paused) {
      const timer = setInterval(() => {
        updateElapsedTime();
        if (
          orderQueue[currentOrderIndex] &&
          orderQueue[currentOrderIndex].totalTime > 0
        ) {
          handleTimeUpdate(orderQueue[currentOrderIndex].totalTime - 1);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [paused, currentOrderIndex, orderQueue]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-screen w-screen lg:flex-row bg-[#0F3F71] bg-[url('./src/assets/bg-blue.png')]">
      <div className="w-1/12"></div>
      <div className="grow h-full bg-white rounded-2xl place-items-center flex flex-row justify-end">
        <div className="w-4/12 h-full flex flex-col px-8 pt-8 pb-4">
          <div className="text-[2.75rem] font-rammetto font-semibold drop-shadow-lg mb-6">
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
        <div className="grow h-full bg-[#FCBA26] rounded-l-2xl grid grid-cols-2 gap-8 px-16 pt-16 overflow-y-auto bg-[url('./src/assets/bg-yellow.png')]">
          {orderQueue.map((queue, index) => (
            <div
              key={index}
              className={`flex flex-col h-[32rem] rounded-3xl justify-between ${
                index === currentOrderIndex ? "bg-[#BD562A] " : "bg-[#E1A530] "
              }`}
            >
              <div
                className={` h-[7.25rem] rounded-3xl drop-shadow-lg font-rammetto font-bold text-4xl text-white flex items-center p-8 ${
                  index === currentOrderIndex ? "bg-[#CE5C1B]" : "bg-[#CE911B]"
                }`}
              >
                Order #{queue.orderId}
              </div>
              <div className="grow h-96 flex flex-col overflow-y-auto">
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
              <div
                className={`flex flex-row h-32 justify-between rounded-3xl drop-shadow-lg space-x-3 p-4 ${
                  index === currentOrderIndex ? "bg-[#994F26]" : "bg-[#F9BB43]"
                }`}
              >
                {index === currentOrderIndex ? (
                  <Countdown
                    initialTime={queue.totalTime}
                    onTimeUpdate={handleTimeUpdate}
                    onComplete={handleComplete}
                    paused={paused}
                  />
                ) : (
                  <div
                    className={`h-full w-2/6 text-3xl text-white font-staatliches rounded-2xl items-center justify-center flex drop-shadow-lg space-x-2 ${
                      index === currentOrderIndex
                        ? "bg-[#CE711B]"
                        : "bg-[#CE911B]"
                    }`}
                  >
                    <span>TIME:</span>
                    <span>{formatTime(queue.totalTime)}</span>
                  </div>
                )}
                <Countup
                  paused={queue.completed}
                  elapsedTime={queue.elapsedTime}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
