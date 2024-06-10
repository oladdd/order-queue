import React, { useState, useEffect, useRef } from "react";

const Countdown = ({ initialTime, onTimeUpdate, onComplete, paused }) => {
  const [time, setTime] = useState(initialTime);
  const hasCompleted = useRef(false);

  useEffect(() => {
    hasCompleted.current = false;
    setTime(initialTime); // Reset time when initialTime changes
  }, [initialTime]);

  useEffect(() => {
    let timer;
    if (time > 0 && !paused) {
      timer = setTimeout(() => {
        const newTime = time - 1;
        setTime(newTime);
        onTimeUpdate(newTime);
      }, 1000);
    } else if (time <= 0 && !hasCompleted.current) {
      hasCompleted.current = true;
      onComplete();
    }
    return () => clearTimeout(timer);
  }, [time, onTimeUpdate, onComplete, paused]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#CE911B] h-full w-2/6 text-4xl text-white font-staatliches rounded-2xl items-center justify-center flex drop-shadow-lg space-x-2">
      <span>TIME:</span>
      <span>{formatTime(time)}</span>
    </div>
  );
};

export default Countdown;
