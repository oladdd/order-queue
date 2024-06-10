import React, { useState, useEffect } from "react";

const Countup = ({ paused, elapsedTime }) => {
  const [time, setTime] = useState(elapsedTime);

  useEffect(() => {
    setTime(elapsedTime); // Set the initial elapsed time
  }, [elapsedTime]);

  useEffect(() => {
    let timer;
    if (!paused) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [paused]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#E88D44] h-full w-3/6 text-[2.5rem] text-[#8B4F1F] font-staatliches rounded-2xl items-center flex drop-shadow-lg justify-center">
      {paused ? "DONE" : "ELAPSED"} {formatTime(time)}
    </div>
  );
};

export default Countup;
