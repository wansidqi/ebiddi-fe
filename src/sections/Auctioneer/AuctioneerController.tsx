import { useStoreContext } from "@/Context";
import { toast } from "@/components/ui/use-toast";
import { CallMessage, callMessage } from "@/data/call-alert";
import { ROLE } from "@/interfaces/enum";
import { EventData } from "@/interfaces/websocket";
import { playAudio } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function AuctioneerController() {
  const { auctionId } = useParams();
  const navigate = useNavigate();

  const { USER, setCountdown, countdown, publishEvent, setPayload, payload } =
    useStoreContext();
  const bid_status: number = 0;
  const bids = [];
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // const queryKey = [KEY.auction_item, auctionId];
  // const auction = useGetQueryData<AuctionLiveItem>(queryKey);

  const { useGetLiveAuction } = useAPIServices();
  const { data: auction } = useGetLiveAuction(auctionId as string);

  const startAlert = ({ call, variant }: CallMessage) => {
    toast({
      duration: 1500,
      variant: variant,
      title: call.toUpperCase(),
    });
    playAudio(call);
  };

  const publishTimer = () => {
    let newPayload: EventData = {
      ...payload,
      countdown,
      auction_id: auctionId as string,
    };
    setPayload(newPayload);
    publishEvent({ event_id: "", data: newPayload });
  };

  const clickStart = () => {
    if (isActive) {
      clickResume();
    } else {
      setIsActive(true);
      setIsPaused(false);
      const newPayload: EventData = { ...payload, status: "RUN" };
      publishEvent({ event_id: "", data: newPayload });
    }
  };

  const clickPause = () => {
    setIsPaused(true);
    const newPayload: EventData = { ...payload, status: "PAUSE" };
    publishEvent({ event_id: "", data: newPayload });
  };

  const clickResume = () => {
    setIsPaused(false);
    const newPayload: EventData = { ...payload, status: "RUN" };
    publishEvent({ event_id: "", data: newPayload });
  };

  const goBack = () => {
    navigate(`/auctioneer/${auction?.meta?.prev}`);
  };

  const goNext = () => {
    navigate(`/auctioneer/${auction?.meta?.next}`);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && countdown > 0 && !isPaused) {
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
  }, [isActive, countdown, isPaused]);

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
    publishTimer();
    if (countdown === 11) return;
  }, [countdown]);

  return (
    <div>
      {USER?.role !== ROLE.AUCTIONEER && (
        <div className="flexcenter gap-6">
          <CondButton onClick={goBack} show={true} isIcon={true}>
            <ArrowLeftSquare size="40px" />
          </CondButton>

          <CondButton
            onClick={clickStart}
            show={true || bid_status === 1 || bid_status == 4}
            className="bg-green-500"
          >
            START
          </CondButton>

          <CondButton
            onClick={clickPause}
            show={true || bid_status == 2 || bid_status == 3}
            className="bg-green-600"
          >
            PAUSE
          </CondButton>

          <CondButton show={true} className="bg-green-600">
            BACK TO AUCTION LIST
          </CondButton>

          <CondButton
            show={bid_status === 1 || bid_status == 4}
            className="bg-green-600"
          >
            WITHDRAW CURRENT VEHICLE
          </CondButton>

          <CondButton show={bid_status == 4} className="bg-green-600">
            RE-AUCTION
          </CondButton>

          <CondButton
            show={bid_status == 3 && bids.length > 0}
            className="bg-green-600"
          >
            SOLD
          </CondButton>

          <CondButton
            show={bid_status == 3 && bids.length == 0}
            className="bg-green-600"
          >
            NO BID
          </CondButton>

          <CondButton show={bid_status == 6} className="bg-green-600">
            END
          </CondButton>

          <CondButton onClick={goNext} show={true} isIcon={true}>
            <ArrowRightSquare size="40px" />
          </CondButton>
        </div>
      )}
    </div>
  );
}

interface CondBtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  show: boolean;
  isIcon?: boolean;
}

const CondButton: React.FC<CondBtn> = ({
  children,
  className,
  show,
  isIcon,
  ...rest
}) => {
  return (
    <>
      {show && (
        <button
          className={`${isIcon ? "flexcenter" : "py-3 rounded-md"}  w-full sm:w-1/2  ${className}`}
          {...rest}
        >
          {children}
        </button>
      )}
    </>
  );
};
