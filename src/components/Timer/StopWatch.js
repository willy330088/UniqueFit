import React from 'react';
import useStopwatch from './useStopWatch';
import Button from './Button';
import TimerStyled from './TimeStyled';

export default function UseStopwatchDemo() {
  const {
    seconds,
    minutes,
    hours,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });


  return (
    <div>
      <TimerStyled seconds={seconds} minutes={minutes} hours={hours} />
      <Button onClick={start}>Start</Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={reset}>Reset</Button>
    </div>
  );
}