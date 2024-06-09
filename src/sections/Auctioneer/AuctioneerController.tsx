import { useStoreContext } from "@/Context";
import { toast } from "@/components/ui/use-toast";
import { CallMessage, callMessage } from "@/data/call-alert";
import { AuctionInterface } from "@/interfaces";
import { LogAuditTrail } from "@/interfaces/API";
import { BidStatus, ROLE } from "@/interfaces/enum";
import { EventData } from "@/interfaces/websocket";
import { playAudio } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LiveDialog } from "../Live/LiveDialog";

export function AuctioneerController() {
  const { auctionId, eventId } = useParams();
  const navigate = useNavigate();

  const {
    USER,
    setCountdown,
    countdown,
    publishEvent,
    setPayload,
    payload,
    socket,
  } = useStoreContext();
  const bid_status: number = 0;
  const bids = [];
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [bidStatus, setBidStatus] = useState<BidStatus>(1);
  const [withdrawModal, setWithdrawModal] = useState(false);

  const {
    useGetLiveAuction,
    usePostAuditTrail,
    usePostItemSold,
    usePostWithdraw,
  } = useAPIServices();

  const { data: auction } = useGetLiveAuction(auctionId as string);
  const { mutateAsync: onPostAuditTrail } = usePostAuditTrail();
  const { mutateAsync: onPostItemSold } = usePostItemSold();
  const { mutateAsync: onWithdraw } = usePostWithdraw();

  const startAlert = ({ call, variant }: CallMessage) => {
    toast({
      duration: 1500,
      variant: variant,
      title: call.toUpperCase(),
    });
    playAudio(call);
  };

  const publishTimer = () => {
    if (!auctionId || !eventId) return;
    setPayload((prev) => ({
      ...prev,
      countdown,
      auction_id: auctionId,
      event_id: eventId,
    }));
    publishEvent({ event_id: eventId, data: { ...payload, countdown } });
  };

  const sendAuditTrail = (log: LogAuditTrail) => {
    if (!USER) return;
    let data = `event_id=${log.event_id}`;
    data += `&auction_id=${log.auction_id}`;
    data += `&type=${log.status}`;
    data += `&user_id=${USER.id}`;
    data += `&bid_amount=${log.bid_amount}`;
    data += `&ip_address=${0}`;

    // onPostAuditTrail({ data });
  };

  const resetBid = () => {
    if (!auction) return;
    let { current, start } = payload.bid;

    setPayload((prev) => ({
      ...prev,
      bid: {
        start: auction.reserve_price,
        up: auction.bid_increment,
        next: start,
        current,
      },
    }));
  };

  const clickStart = () => {
    if (isActive) {
      clickResume();
    } else {
      setCountdown(11);
      setIsActive(true);
      setIsPaused(false);
      setBidStatus(BidStatus.RUN);
      const newPayload: EventData = { ...payload, status: "RUN" };
      if (!eventId) return;
      publishEvent({ event_id: eventId, data: newPayload });

      sendAuditTrail({
        event_id: Number(payload.event_id),
        auction_id: Number(payload.auction_id),
        bid_amount: 0,
        status: "START",
      });
    }
  };

  const clickPause = () => {
    setIsPaused(true);
    setBidStatus(BidStatus.PAUSE);
    const newPayload: EventData = { ...payload, status: "PAUSE" };
    if (!eventId) return;
    publishEvent({ event_id: eventId, data: newPayload });
    sendAuditTrail({
      event_id: Number(payload.event_id),
      auction_id: Number(payload.auction_id),
      bid_amount: 0,
      status: "PAUSE",
    });
  };

  const clickResume = () => {
    setBidStatus(BidStatus.RUN);
    setIsPaused(false);
    const newPayload: EventData = { ...payload, status: "RUN" };
    setPayload(newPayload);
    publishEvent({ event_id: "", data: newPayload });

    sendAuditTrail({
      event_id: Number(payload.event_id),
      auction_id: Number(payload.auction_id),
      bid_amount: 0,
      status: "UNPAUSE",
    });
  };

  const clickWithdraw = () => {
    // onWithdraw(payload.auction_id, {
    //   onSuccess: () => {
    //     setPayload((prev) => ({ ...prev, status: "WITHDRAW" }));
    //     //stop timer
    //     setCountdown(0);
    //     setIsActive(false);
    //     setIsPaused(false);
    //     if (!eventId) return;
    //     publishEvent({
    //       event_id: eventId,
    //       data: { ...payload, status: "WITHDRAW" },
    //     });
    //     setBidStatus(BidStatus.WITHDRAW);
    //     sendAuditTrail({
    //       event_id: Number(payload.event_id),
    //       auction_id: Number(payload.auction_id),
    //       status: "WITHDRAW",
    //       bid_amount: 0,
    //     });
    //   },
    // });
  };

  const clickReauction = () => {
    let newPayload: EventData = {
      ...payload,
      status: "REAUCTION",
      bidders: {
        all: [],
        highest_amount: 0,
        highest_user_id: 0,
        highest_user_name: "",
      },
    };
    setPayload(newPayload);
    resetBid();

    setBidStatus(BidStatus.START);

    if (!eventId) return;
    publishEvent({ event_id: eventId, data: newPayload });

    sendAuditTrail({
      event_id: Number(payload.event_id),
      auction_id: Number(payload.auction_id),
      bid_amount: 0,
      status: "REAUCTION",
    });
  };

  const clickBackToAuction = () => {
    navigate(`/list/${eventId}`);
  };

  const clickHold = () => {
    setBidStatus(BidStatus.HOLD);
    setIsPaused(true);
    const newPayload: EventData = { ...payload, status: "HOLD" };
    if (!eventId) return;
    publishEvent({ event_id: eventId, data: newPayload });
    sendAuditTrail({
      event_id: Number(payload.event_id),
      auction_id: Number(payload.auction_id),
      bid_amount: 0,
      status: "HOLD",
    });
  };

  const clickSold = () => {
    setBidStatus(BidStatus.CLOSE);
    const newPayload: EventData = { ...payload, status: "SOLD" };
    if (!eventId) return;
    publishEvent({ event_id: eventId, data: newPayload });
  };

  const clickEnd = () => {
    setPayload((prev) => ({ ...prev, status: "END" }));
    if (!eventId) return;
    publishEvent({ event_id: eventId, data: { ...payload, status: "END" } });

    itemSold();

    setBidStatus(0);
  };

  const itemSold = () => {
    const auction_id = `${payload.auction_id}`;

    const postData = {
      user_id: payload.bidders.highest_user_id,
      bidding_price: payload.bidders.highest_amount,
      total_bid: payload.bidders.all.length,
      min_bid: 0,
      max_bid: payload.bidders.highest_amount,
      event_id: payload.event_id,
      status: "SOLD",
      audit_trail_document: `http://52.77.243.149:8000/audit/auction/${payload.auction_id}`,
    };

    const data = new URLSearchParams(postData as any).toString();

    // onPostItemSold(
    //   { auction_id, data },
    //   {
    //     onSuccess: () => {
    //       sendAuditTrail({
    //         event_id: Number(payload.event_id),
    //         auction_id: Number(payload.auction_id),
    //         status: "SOLD",
    //         bid_amount: 0,
    //       });
    //     },
    //   }
    // );
  };

  const getCurrentBid = (amount: number) => {
    if (payload.bid.up == 100) {
      return amount + 100;
    }

    if (amount < 50000) {
      return amount + 200;
    } else if (amount < 100000) {
      return amount + 500;
    }
    return amount + 1000;
  };

  const goBack = () => {
    navigate(`/auctioneer/${auction?.meta?.prev}`);
  };

  const goNext = () => {
    navigate(`/auctioneer/${auction?.meta?.next}`);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // if (bidStatus === BidStatus.END || payload.status === "SOLD") {
    //   setCountdown(0);
    // } else {
    //   setCountdown(payload.countdown);
    // }

    if (isActive && countdown > 0 && !isPaused) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          let cd = prevCountdown - 1;
          return cd;
        });
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
    switch (countdown) {
      case 8:
        startAlert({ call: "calling once", variant: "once" });
        break;
      case 4:
        startAlert({ call: "calling twice", variant: "twice" });
        break;
      case 0:
        if (payload.status !== "SOLD") {
          startAlert({ call: "final call", variant: "final" });
        }

        if (bidStatus !== BidStatus.CLOSE) {
          let newStat = BidStatus.END;
          setBidStatus(newStat);
        }

        setTimeout(
          () => startAlert({ call: "final call", variant: "final" }),
          3000
        );
        setTimeout(
          () => startAlert({ call: "final call", variant: "final" }),
          6000
        );

        break;

      default:
        break;
    }

    publishTimer();
  }, [countdown, socket]);

  return (
    <>
      <LiveDialog
        state={withdrawModal}
        handleState={setWithdrawModal}
        title={`Are you sure?`}
        content={`withdrawing LOT ${payload.auction_id}`}
        variant="destructive"
        onClick={() => clickWithdraw()}
      />
      <div>
        {USER?.role === ROLE.AUCTIONEER && (
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
              onClick={() => setWithdrawModal(true)}
              show={true || bid_status === 1 || bid_status == 4}
              className="bg-green-600"
            >
              WITHDRAW CURRENT VEHICLE
            </CondButton>

            <CondButton
              onClick={clickReauction}
              show={bid_status == 4}
              className="bg-green-600"
            >
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

            <CondButton
              onClick={clickEnd}
              show={bid_status == 6}
              className="bg-green-600"
            >
              END
            </CondButton>

            <CondButton onClick={goNext} show={true} isIcon={true}>
              <ArrowRightSquare size="40px" />
            </CondButton>
          </div>
        )}
      </div>
    </>
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
