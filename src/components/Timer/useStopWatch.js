import { useState, useRef, useEffect } from 'react';

export default function useStopwatch({ autoStart, offsetTimestamp }) {
  function useInterval(callback, delay) {
    const callbacRef = useRef();

    // update callback function with current render callback that has access to latest props and state
    useEffect(() => {
      callbacRef.current = callback;
    });

    useEffect(() => {
      if (!delay) {
        return () => {};
      }

      const interval = setInterval(() => {
        callbacRef.current && callbacRef.current();
      }, delay);
      return () => clearInterval(interval);
    }, [delay]);
  }


  function getTimeFromSeconds(secs) {
    const totalSeconds = Math.ceil(secs);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return {
      seconds,
      minutes,
      hours,
      days,
    };
  }

  function getSecondsFromExpiry(expiry, shouldRound) {
    const now = new Date().getTime();
    const milliSecondsDistance = expiry - now;
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000;
      return shouldRound ? Math.round(val) : val;
    }
    return 0;
  }

  function getSecondsFromPrevTime(prevTime, shouldRound) {
    const now = new Date().getTime();
    const milliSecondsDistance = now - prevTime;
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000;
      return shouldRound ? Math.round(val) : val;
    }
    return 0;
  }

  function getSecondsFromTimeNow() {
    const now = new Date();
    const currentTimestamp = now.getTime();
    const offset = (now.getTimezoneOffset() * 60);
    return (currentTimestamp / 1000) - offset;
  }

  function getFormattedTimeFromSeconds(totalSeconds, format) {
    const { seconds: secondsValue, minutes, hours } = getTimeFromSeconds(totalSeconds);
    let ampm = '';
    let hoursValue = hours;

    if (format === '12-hour') {
      ampm = hours >= 12 ? 'pm' : 'am';
      hoursValue = hours % 12;
    }

    return {
      seconds: secondsValue,
      minutes,
      hours: hoursValue,
      ampm,
    };
  }


  const [passedSeconds, setPassedSeconds] = useState(getSecondsFromExpiry(offsetTimestamp, true) || 0);
  const [prevTime, setPrevTime] = useState(new Date());
  const [seconds, setSeconds] = useState(passedSeconds + getSecondsFromPrevTime(prevTime || 0, true));
  const [isRunning, setIsRunning] = useState(autoStart);

  useInterval(() => {
    setSeconds(passedSeconds + getSecondsFromPrevTime(prevTime, true));
  }, isRunning ? 1000 : null);

  function start() {
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setIsRunning(true);
    setSeconds(passedSeconds + getSecondsFromPrevTime(newPrevTime, true));
  }

  function pause() {
    setPassedSeconds(seconds);
    setIsRunning(false);
  }

  function reset(offset = 0, newAutoStart = true) {
    const newPassedSeconds = getSecondsFromExpiry(offset, true) || 0;
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setPassedSeconds(newPassedSeconds);
    setIsRunning(newAutoStart);
    setSeconds(newPassedSeconds + getSecondsFromPrevTime(newPrevTime, true));
  }

  return {
    ...getTimeFromSeconds(seconds), start, pause, reset, isRunning,
  };
}