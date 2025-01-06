import { useState, useRef } from "react";
import Results from "./Results";
export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timer = useRef(); // It does not reset for every reRender, also changing this does not trigger re execution
  const dialog = useRef();

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleTimerStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTargetTime) => prevTargetTime - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <Results targetTime={targetTime} ref={dialog} timeRemaining={timeRemaining} onReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleTimerStart}>{timerIsActive ? "Stop Timer" : "Start Timer"}</button>
        </p>
        <p className={timerIsActive ? "Active" : ""}>{timerIsActive ? "Timer is running" : "Timer Inactive"}</p>
      </section>
    </>
  );
}
