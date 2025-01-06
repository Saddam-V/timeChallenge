import { useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
export default function Results({ targetTime, ref, timeRemaining, onReset }) {
  const internalDialog = useRef();

  const userLost = timeRemaining <= 0;
  const formattedRemainingTime = (timeRemaining / 1000).toFixed(2);
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        internalDialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="result-modal" ref={internalDialog}>
      {userLost ? <h2> You Lost</h2> : <h2> Your Score: {score} </h2>}
      <p>
        Your target time was <strong>{targetTime}</strong>
      </p>
      <p>
        You stopped the timer with <strong>{formattedRemainingTime} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
