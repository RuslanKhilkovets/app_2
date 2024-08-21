import {useState, useEffect, useRef} from 'react';

const useTimer = (initialTime: number) => {
  const [timer, setTimer] = useState(initialTime);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setIsTimerActive(true);
    setTimer(initialTime);

    timerRef.current = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (timer === 0) {
      stopTimer();
    }
  }, [timer]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return {timer, isTimerActive, startTimer, stopTimer};
};

export default useTimer;
