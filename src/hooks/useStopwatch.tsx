import { useEffect, useRef, useState } from "react";

export default function useStopwatch() {
  const [rawSeconds, setRawSeconds] = useState(0);
  const intervalRef = useRef<any>(null);

  const startStopwatch = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setRawSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopStopwatch = () => {
    if (!intervalRef.current) return;
    
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const minutes = Math.floor(rawSeconds / 60);
  const seconds = rawSeconds % 60;

  return {
    minutes,
    seconds,
    startStopwatch,
    stopStopwatch,
  }
}
