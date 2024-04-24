import { isCountdown } from "@/lib/utils";
import { useState, useEffect } from "react";

export const Countdown = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState(isCountdown(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = isCountdown(targetDate);
      if (Object.keys(newTimeLeft).length === 0) {
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      {!Object.keys(timeLeft).length ? (
        <div>
          <button className="bg-green-500 px-3 py-2 my-3 rounded-md font-bold w-full">
            JOIN BIDDING
          </button>
        </div>
      ) : (
        <div className="flexcenter gap-4 text-center">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex">
              <p>{value}</p>
              <p>{unit}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
