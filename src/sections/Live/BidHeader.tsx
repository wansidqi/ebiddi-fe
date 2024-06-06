import { useStoreContext } from "@/Context";
import { DynamicRenderer } from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { ROLE } from "@/interfaces/enum";
import { ChannelData } from "@/interfaces/websocket";
import { numWithComma, playAudio } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface CallMessage {
  call: string;
  variant: "once" | "twice" | "final";
}

const callMessage: CallMessage[] = [
  {
    call: "calling once",
    variant: "once",
  },
  {
    call: "calling twice",
    variant: "twice",
  },
  {
    call: "final call",
    variant: "final",
  },
];

export function BidHeader() {
  const { eventId } = useParams();
  const { toast } = useToast();

  const [isActive, setIsActive] = useState(false);
  const { countdown, setCountdown, USER, publish, socket, subscription, dev } =
    useStoreContext();

  const { useGetCredit, useGetEventById } = useAPIServices();
  const { data: event } = useGetEventById(eventId as string);
  const { data } = useGetCredit(event?.auction_house.id.toString() as string);

  const isAuctioneer = USER?.role === ROLE.AUCTIONEER;

  const startAlert = ({ call, variant }: CallMessage) => {
    toast({
      duration: 1500,
      variant: variant,
      title: call.toUpperCase(),
    });
    playAudio(call);
  };

  const subscribeEvent = () => {
    subscription<ChannelData>({
      channel: "event",
      id: "",
      onData: (data) => {
        setCountdown(data.countdown);
      },
    });
  };

  const publishEvent = () => {
    publish<ChannelData>({
      channel: "event",
      auction_id: data?.id.toString() as string,
      id: event?.id.toString() as string,
      data: { countdown },
    });
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const displayTime = () => {
    let display = "00:00";

    if (countdown?.toString().length === 2) {
      display = `00:${countdown}`;
      return display;
    } else if (countdown?.toString().length === 1) {
      display = `00:0${countdown}`;
      return display;
    } else if (!isActive) {
      display = "00:00";
      return display;
    }
  };

  useEffect(() => {
    if (countdown === 8) {
      startAlert(callMessage[0]);
    } else if (countdown === 4) {
      startAlert(callMessage[1]);
    } else if (countdown === 0) {
      startAlert(callMessage[2]);
    }
  }, [countdown]);

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
        setCountdown(11);
      }, 1000);
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [isActive, countdown]);

  useEffect(() => {
    subscribeEvent();
  }, [socket]);

  useEffect(() => {
    publishEvent();
    if (countdown === 11) return;
  }, [countdown]);

  return (
    <div>
      <DynamicRenderer>
        <DynamicRenderer.When cond={USER !== null}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 sm:gap-y-6 my-8">
            <div className="flexcenter-col col-span-2 sm:col-span-3 sm:order-1 text-3xl">
              <p className="text-primary">Ends in:</p>
              <p className="digital text-5xl font-bold">{displayTime()}</p>
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
        </DynamicRenderer.When>
        <DynamicRenderer.Else>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 sm:gap-y-6 my-8">
            <div className="flexcenter-col col-span-2 sm:col-span-1 sm:order-2 text-3xl">
              <p className="text-primary">Ends in:</p>
              <p className="digital text-5xl font-bold">{displayTime()}</p>
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
        </DynamicRenderer.Else>
      </DynamicRenderer>

      {isAuctioneer ||
        (dev && (
          <button
            className={`w-full ${isActive ? "bg-gray-500" : "bg-green-500"}  px-3 py-2 rounded-md`}
            onClick={handleStart}
            disabled={isActive}
          >
            Start Countdown
          </button>
        ))}
    </div>
  );
}
