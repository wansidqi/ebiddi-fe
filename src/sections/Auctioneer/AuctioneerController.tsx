import { useStoreContext } from "@/Context";
import { LogAuditTrail } from "@/interfaces/API";
import { BidStatus, ROLE } from "@/interfaces/enum";
import { BidData, EventData } from "@/interfaces/websocket";
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
    subscribeBid,
    bidStatus,
    setBidStatus,
  } = useStoreContext();

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [bids, setBids] = useState<BidData[]>([]);
  const [naviStatus, setNaviStatus] = useState(false);

  const {
    useGetLiveAuction,
    usePostAuditTrail,
    usePostItemSold,
    usePostWithdraw,
  } = useAPIServices();

  const { data: auction, refetch } = useGetLiveAuction(auctionId as string);
  const { mutateAsync: onPostAuditTrail } = usePostAuditTrail();
  const { mutateAsync: onPostItemSold } = usePostItemSold();
  const { mutateAsync: onWithdraw } = usePostWithdraw();

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

    onPostAuditTrail({ data });
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
      setNaviStatus(false);

      setBidStatus(BidStatus.RUN);

      const newPayload: EventData = { ...payload, status: "AUCTION" };
      setPayload(newPayload);
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

    setPayload(newPayload);
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
    const newPayload: EventData = { ...payload, status: "AUCTION" };
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
    onWithdraw(payload.auction_id, {
      onSuccess: () => {
        setPayload((prev) => ({ ...prev, status: "WITHDRAW" }));
        //stop timer
        setCountdown(0);
        setIsActive(false);
        setIsPaused(false);
        if (!eventId) return;
        publishEvent({
          event_id: eventId,
          data: { ...payload, status: "WITHDRAW" },
        });

        setBidStatus(BidStatus.WITHDRAW);
        setNaviStatus(true);

        sendAuditTrail({
          event_id: Number(payload.event_id),
          auction_id: Number(payload.auction_id),
          status: "WITHDRAW",
          bid_amount: 0,
        });
      },
    });
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
    navigate(`/auctioneer/list/${eventId}`);
  };

  const clickHold = () => {
    setNaviStatus(true);
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
    const newPayload: EventData = { ...payload, status: "SOLD" };
    if (!eventId) return;
    publishEvent({ event_id: eventId, data: newPayload });

    setBidStatus(BidStatus.CLOSE);
    setNaviStatus(false);
  };

  const clickEnd = () => {
    setPayload((prev) => ({ ...prev, status: "END" }));
    if (!eventId) return;
    publishEvent({ event_id: eventId, data: { ...payload, status: "END" } });

    itemSold();

    setBidStatus(0);
    setNaviStatus(true);
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

    onPostItemSold(
      { auction_id, data },
      {
        onSuccess: () => {
          sendAuditTrail({
            event_id: Number(payload.event_id),
            auction_id: Number(payload.auction_id),
            status: "SOLD",
            bid_amount: 0,
          });
        },
      }
    );
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

  const goPrev = () => {
    if (auction?.meta?.prev !== 0) {
      navigate(`/auctioneer/live/${eventId}/${auction?.meta?.prev}`);
    }
  };

  const goNext = () => {
    if (auction?.meta?.next !== 0) {
      navigate(`/auctioneer/live/${eventId}/${auction?.meta?.next}`);
    }
  };

  useEffect(() => {
    const sendDisplay = () => {
      setNaviStatus(true);
      if (!eventId) return;
      resetBid();
      publishEvent({ event_id: eventId, data: payload });
    };
    sendDisplay();
  }, [eventId, auction]);

  useEffect(() => {
    refetch();

    if (!eventId || !auctionId) return;
    subscribeBid({
      auction_id: auctionId,
      event_id: eventId,
      onData: (data) => {
        console.log(data);

        if (payload.bidders.highest_amount >= data.amount) {
          return;
        }

        if (payload.bidders.highest_user_id === data.user_id) {
          return;
        }

        setBids((prev) => [...prev, data]);

        setPayload((prev) => {
          const updatedPayload = {
            ...prev,
            bidders: {
              all: [...prev.bidders.all, data],
              highest_amount: data.amount,
              highest_user_id: data.user_id,
              highest_user_name: data.name,
            },
            bid: {
              current: data.amount,
              next: getCurrentBid(data.amount),
              start: prev.bid.start,
              up: prev.bid.up,
            },
          };

          publishEvent({ event_id: eventId, data: updatedPayload });

          return updatedPayload;
        });
      },
    });
  }, [auctionId, socket]);

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
    publishTimer();

    if (countdown === 0) {
      setBidStatus(1);
      const timeout = setTimeout(() => {
        setIsActive(false);
        setCountdown(11);
      }, 1000);
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [isActive, countdown, isPaused]);

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
            <CondButton
              onClick={goPrev}
              show={auction?.meta.prev !== 0 && naviStatus}
              isIcon={true}
            >
              <ArrowLeftSquare size="40px" />
            </CondButton>

            <CondButton
              onClick={clickStart}
              show={bidStatus === 1 || bidStatus === 4}
              className="bg-green-500"
            >
              START
            </CondButton>

            <CondButton
              onClick={clickPause}
              show={bidStatus === 2 || bidStatus === 3}
              className="bg-green-600"
            >
              PAUSE
            </CondButton>

            <CondButton
              onClick={clickBackToAuction}
              show={naviStatus}
              className="bg-green-600"
            >
              BACK TO AUCTION LIST
            </CondButton>

            <CondButton
              onClick={() => setWithdrawModal(true)}
              show={bidStatus === 1 || bidStatus === 4}
              className="bg-green-600"
            >
              WITHDRAW CURRENT VEHICLE
            </CondButton>

            <CondButton
              onClick={clickReauction}
              show={bidStatus === 4}
              className="bg-green-600"
            >
              RE-AUCTION
            </CondButton>

            <CondButton
              onClick={clickSold}
              show={bidStatus == 3 && bids.length > 0}
              className="bg-green-600"
            >
              SOLD
            </CondButton>

            <CondButton
              onClick={clickHold}
              show={bidStatus == 3 && bids.length == 0}
              className="bg-green-600"
            >
              NO BID
            </CondButton>

            <CondButton
              onClick={clickEnd}
              show={bidStatus == 6}
              className="bg-green-600"
            >
              END
            </CondButton>

            <CondButton
              onClick={goNext}
              show={auction?.meta?.next !== 0 && naviStatus}
              isIcon={true}
            >
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
