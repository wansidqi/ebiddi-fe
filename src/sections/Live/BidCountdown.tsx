import { useStoreContext } from "@/Context";
import { numWithComma } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function BidCountdown() {
  const { eventId } = useParams();
  const { countdown, setCountdown, dev, USER } = useStoreContext();
  const [isActive, setIsActive] = useState(false);

  const { useGetCredit, useGetEventById } = useAPIServices();
  const { data: event } = useGetEventById(eventId as string);
  const { data } = useGetCredit(event?.auction_house.id.toString() as string);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0) {
      const timeout = setTimeout(() => {
        setIsActive(false);
        setCountdown(9);
      }, 1000);
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [isActive, countdown]);

  const handleStart = () => {
    setIsActive(true);
  };

  return (
    <div>
      {USER ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 sm:gap-y-6 my-8">
          <div className="flexcenter-col col-span-2 sm:col-span-3 sm:order-1 text-3xl">
            <p className="text-primary">Ends in:</p>
            <p className="digital text-5xl font-bold">
              {!isActive ? "00:00" : `00:0${countdown}`}
            </p>
          </div>
          <div className="flexcenter-col text-lg sm:order-2">
            <p className="text-primary sm:text-2xl">Current Bid:</p>
            <p className="text-yellow-500 sm:text-2xl">RM 888,888</p>
          </div>
          <div className="flexcenter-col text-lg sm:order-3">
            <p className="text-primary sm:text-2xl">Current Bidder:</p>
            <p className="text-yellow-500 sm:text-2xl">WAN AHMAD SIDQI</p>
          </div>
          <div className="flexcenter-col col-span-2 sm:col-span-1 text-lg sm:order-2">
            <p className="text-primary sm:text-2xl">Deposit Balance:</p>
            <p className="sm:text-2xl">{data?.auction_house.name}t</p>
            <p className="text-yellow-500 sm:text-2xl">
              RM{numWithComma(data?.amount as number)}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 sm:gap-y-6 my-8">
          <div className="flexcenter-col col-span-2 sm:col-span-1 sm:order-2 text-3xl">
            <p className="text-primary">Ends in:</p>
            <p className="digital text-5xl font-bold">
              {!isActive ? "00:00" : `00:0${countdown}`}
            </p>
          </div>
          <div className="flexcenter-col text-lg sm:order-1">
            <p className="text-primary sm:text-2xl">Current Bid:</p>
            <p className="text-yellow-500 sm:text-2xl">RM 888,888</p>
          </div>
          <div className="flexcenter-col text-lg sm:order-3">
            <p className="text-primary sm:text-2xl">Current Bidder:</p>
            <p className="text-yellow-500 sm:text-2xl">WAN AHMAD SIDQI</p>
          </div>
        </div>
      )}

      {dev && (
        <button
          className={`w-full ${isActive ? "bg-gray-500" : "bg-green-500"}  px-3 py-2 rounded-md`}
          onClick={handleStart}
          disabled={isActive}
        >
          Start Countdown
        </button>
      )}
    </div>
  );
}
