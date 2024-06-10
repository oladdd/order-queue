import React, { useState, useEffect, useRef } from "react";

const Countdown = ({ initialTime, onTimeUpdate, onComplete }) => {
  const [time, setTime] = useState(initialTime);
  const hasCompleted = useRef(false);

  useEffect(() => {
    hasCompleted.current = false;
    setTime(initialTime); // Reset time when initialTime changes
  }, [initialTime]);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        const newTime = time - 1;
        setTime(newTime);
        onTimeUpdate(newTime);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!hasCompleted.current) {
      hasCompleted.current = true;
      onComplete();
    }
  }, [time, onTimeUpdate, onComplete]);

  return (
    <div className="bg-[#CE911B] h-full w-[9.75rem] text-4xl text-white font-staatliches rounded-2xl items-center flex drop-shadow-lg justify-center">
      TIME: <span>{time}</span>
      <span className="pl-1 text-3xl flex flex-col justify-end">s</span>
    </div>
  );
};

export default Countdown;
