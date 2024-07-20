import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const Timer = forwardRef(({ isActive }, ref) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useImperativeHandle(ref, () => ({
    resetTimer() {
      setMinutes(0);
      setSeconds(0);
    }
  }));

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds < 59) {
          setSeconds((prevSeconds) => prevSeconds + 1);
        } else {
          setMinutes((prevMinutes) => prevMinutes + 1);
          setSeconds(0);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div>
      <p>
        Timer: {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </p>
    </div>
  );
});

export default Timer;
