"use client";
import React, { useState, useEffect } from "react";

const CountDown = () => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const calculateTime = (timeRemaining: number) => {
    const h = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const m = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const s = Math.floor((timeRemaining / 1000) % 60);

    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    const duration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    let remainingTime = duration;

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1000;
        } else {
          // Reset the timer when it reaches zero
          remainingTime = duration;
          return duration;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []); // No dependencies, as duration is a constant within this scope

  return (
    <span className="font-bold text-5xl text-yellow-300">
      {calculateTime(timeRemaining)}
    </span>
  );
};

export default CountDown;
