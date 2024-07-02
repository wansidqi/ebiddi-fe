import { useStoreContext } from "@/Context";
import { LogAuditTrail } from "@/interfaces/API";
import { BidStatus, COUNTDOWN, ROLE } from "@/enum";
import { BidData, EventData } from "@/interfaces/websocket";
import { useAPIServices } from "@/services";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LiveDialog } from "../Live/LiveDialog";
import { UseCountdown } from "..";
import { Status } from "@/types";

export function AuctioneerController() {
  const { auctionId, eventId } = useParams();
  const navigate = useNavigate();

  const {
    USER,
    publishEvent,
    setPayload,
    payload,
    socket,
    subscribeBid,
    setBidListIndex,
    $swal,
  } = useStoreContext();
  const { countdown, bidStatus } = payload;

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [naviStatus, setNaviStatus] = useState(true);

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

  const resetBid = (onReset?: () => any) => {
    if (!auction) return;
    let { current } = payload.bid;

    setPayload((prev) => {
      let update = {
        ...prev,
        bid: {
          start: auction.reserve_price,
          up: auction.bid_increment,
          next: auction.reserve_price,
          current,
        },
      };

      onReset && onReset();

      return update;
    });
  };

  const onInitial = () => {
    // setNaviStatus(true);
    if (!eventId || !auctionId) return;
    refetch();

    resetBid();

    setPayload((prev) => {
      let update = {
        ...prev,
        event_id: eventId,
        auction_id: auctionId,
        countdown: COUNTDOWN.initial,
        status: "DISPLAY" as Status,
        bidders: {
          all: [],
          highest_amount: 0,
          highest_user_id: 0,
          highest_user_name: "",
        },
        auction,
      };

      publishEvent({ event_id: eventId, data: update });

      return update;
    });
  };

  const publishTimer = () => {
    if (!auctionId || !eventId) return;
    // socket?.invokePublish("timer", countdown);
    publishEvent({ event_id: eventId, data: { ...payload, countdown } });
  };

  ///comment for testing
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

  const clickStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setNaviStatus(false);

    // setBidStatus(BidStatus.RUN);

    onInitial();

    if (!eventId) return;
    if (!auction) return;

    setPayload((prev) => {
      let data = {
        ...prev,
        status: "AUCTION" as Status,
        countdown: COUNTDOWN.start, ///start cd
        isResume: false,
        bidStatus: BidStatus.RUN,
      };
      publishEvent({ event_id: eventId, data });
      return data;
    });

    sendAuditTrail({
      event_id: Number(payload.event_id),
      auction_id: Number(payload.auction_id),
      bid_amount: 0,
      status: "START",
    });
  };

  const clickPause = () => {
    setIsPaused(true);
    // setBidStatus(BidStatus.PAUSE);
    const newPayload: EventData = {
      ...payload,
      status: "PAUSE",
      bidStatus: BidStatus.PAUSE,
    };
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
    // setBidStatus(BidStatus.RUN);
    setIsPaused(false);

    setPayload((prev) => {
      let newPayload = {
        ...prev,
        status: "AUCTION" as Status,
        auction_id: auctionId!,
        isResume: true,
        bidStatus: countdown < 0 ? 3 : BidStatus.RUN,
        // countdown: payload.countdown !== -1 ? prev.countdown : 0,
      };

      publishEvent({ event_id: eventId!, data: newPayload });

      return newPayload;
    });

    // setBidStatus((prev) => (countdown < 0 ? 3 : prev));

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
        ///reset countdown
        setIsActive(false);
        setIsPaused(false);
        if (!eventId) return;

        setPayload((prev) => {
          let update = {
            ...prev,
            status: "WITHDRAW" as Status,
            countdown: COUNTDOWN.initial,
            bidStatus: BidStatus.WITHDRAW,
            // auction_id: "",
          };

          publishEvent({
            event_id: eventId,
            data: { ...payload, status: "WITHDRAW" },
          });

          return update;
        });

        // setBidStatus(BidStatus.WITHDRAW);
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
      bidStatus: BidStatus.START,
    };
    setPayload(newPayload);
    resetBid();

    // setBidStatus(BidStatus.START);

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
    // setBidStatus(BidStatus.HOLD);
    setIsPaused(true);

    if (!eventId) return;

    setPayload((prev) => {
      let newPayload = {
        ...prev,
        status: "HOLD" as Status,
        bidStatus: BidStatus.HOLD,
      };

      publishEvent({ event_id: eventId, data: newPayload });

      return newPayload;
    });

    sendAuditTrail({
      event_id: Number(payload.event_id),
      auction_id: Number(payload.auction_id),
      bid_amount: 0,
      status: "HOLD",
    });
  };

  const clickSold = () => {
    // const newPayload: EventData = { ...payload, status: "SOLD" };
    if (!eventId) return;
    setIsActive(false);
    // publishEvent({ event_id: eventId, data: newPayload });

    setPayload((prev) => {
      let update = {
        ...prev,
        status: "SOLD" as Status,
        bidStatus: BidStatus.CLOSE,
      };

      publishEvent({ event_id: eventId, data: update });

      return update;
    });

    // setBidStatus(BidStatus.CLOSE);
    setNaviStatus(false);
  };

  const clickEnd = () => {
    if (!eventId) return;
    // setPayload((prev) => ({ ...prev, status: "END" }));
    // publishEvent({ event_id: eventId, data: { ...payload, status: "END" } });

    setPayload((prev) => {
      let update = {
        ...prev,
        status: "END" as Status,
        bidStatus: 0,
      };

      publishEvent({ event_id: eventId, data: update });

      return update;
    });

    itemSold();

    // setBidStatus(0);
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

  UseCountdown();

  // useEffect(() => {
  //   if (!isCountdownActive) setPayload((prev) => ({ ...prev, bidStatus: 0 }));
  // }, [isCountdownActive, reauctionCd]);

  ///reset bid
  useEffect(() => {
    setPayload((prev) => ({ ...prev, bidStatus: 0 }));
    onInitial();

    return () => {
      setPayload((prev) => {
        let update = {
          ...prev,
          auction_id: "",
          status: "DISPLAY" as Status,
          bidders: {
            all: [],
            highest_amount: 0,
            highest_user_id: 0,
            highest_user_name: "",
          },
          bid: {
            current: 0,
            next: 0,
            start: 0,
            up: 0,
          },
          countdown: COUNTDOWN.initial,
        };

        publishEvent({
          event_id: eventId!,
          data: update,
        });

        return update;
      });
    };
  }, [auctionId]);

  ///subscribe bid
  useEffect(() => {
    refetch();

    if (!eventId || !auctionId) return;
    subscribeBid({
      auction_id: auctionId,
      event_id: eventId,
      onData: (data) => {
        if (payload.bidders.highest_amount >= data.amount) {
          return;
        }

        if (payload.bidders.highest_user_id === data.user_id) {
          return;
        }

        setPayload((prev) => {
          const duplciateAmount = prev.bidders.all.some(
            (bidder) => bidder.amount === data.amount
          );

          if (duplciateAmount) {
            return prev;
          }

          /*  */
          let current: BidData = {
            amount: prev.bidders.highest_amount,
            name: prev.bidders.highest_user_name,
            user_id: prev.bidders.highest_user_id,
          };
          let previous: BidData[] = prev.bidders.all;

          if (current.amount !== data.amount && current.amount !== 0) {
            previous = [current, ...previous];
          }
          current = data;
          /*  */

          const updatedPayload = {
            ...prev,
            status: "" as Status,
            bidders: {
              all: previous,
              // all: [data, ...prev.bidders.all],
              highest_amount: data.amount,
              highest_user_id: data.user_id,
              highest_user_name: data.name,
            },
            countdown: COUNTDOWN.start,
            bid: {
              current: data.amount,
              next: getCurrentBid(data.amount),
              start: prev.bid.start,
              up: prev.bid.up,
            },
          };

          setBidListIndex(0);
          setIsActive(true);

          publishEvent({ event_id: eventId, data: updatedPayload });

          return updatedPayload;
        });
      },
    });
  }, [auctionId, socket]);

  ///timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    // if (payload.status === "SOLD") {
    //   setPayload((prev) => ({ ...prev, countdown: COUNTDOWN.initial })); ///reset countdown
    // }

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setPayload((prev) => ({ ...prev, countdown: prev.countdown - 1 })); ///decrement
      }, 1000);
      publishTimer();
    }

    // if (countdown === 0) {
    //   // setBidStatus(1);
    //   const timeout = setTimeout(() => {
    //     setIsActive(false);
    //     setPayload((prev) => ({ ...prev, countdown: COUNTDOWN.initial })); ///reset countdown
    //   }, 1000);
    //   return () => clearTimeout(timeout);
    // }

    return () => clearInterval(interval);
  }, [isActive, countdown, isPaused]);

  return (
    <>
      <LiveDialog />
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
              show={bidStatus === 0 || bidStatus === 1}
              className="bg-green-500"
            >
              START
            </CondButton>

            <CondButton
              onClick={clickResume}
              show={bidStatus === 4}
              className="bg-green-500"
            >
              RESUME
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
              className="bg-blue-600"
            >
              BACK TO AUCTION LIST
            </CondButton>

            <CondButton
              onClick={() =>
                $swal({
                  title: `Are you sure?`,
                  content: `withdrawing LOT ${payload.auction_id}`,
                  variant: "destructive",
                  timer: undefined,
                  hasClose: true,
                  onClick: () => clickWithdraw(),
                })
              }
              show={bidStatus === 0 || bidStatus === 1 || bidStatus === 4}
              className="bg-rose-800"
            >
              WITHDRAW CURRENT VEHICLE
            </CondButton>

            <CondButton
              onClick={clickReauction}
              show={bidStatus === 4}
              className="bg-lime-500"
            >
              RE-AUCTION
            </CondButton>

            <CondButton
              onClick={clickSold}
              show={bidStatus == 3 && payload.bidders.all.length > 0}
              className="bg-amber-600"
            >
              SOLD
            </CondButton>

            <CondButton
              onClick={clickHold}
              show={bidStatus == 3 && payload.bidders.all.length == 0}
              className="bg-black text-white"
            >
              NO BID
            </CondButton>

            <CondButton
              onClick={clickEnd}
              show={bidStatus == 6}
              className="bg-emerald-600"
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
          className={`${isIcon ? "flexcenter" : "py-3 px-5 rounded-md"}  ${className}`}
          {...rest}
        >
          {children}
        </button>
      )}
    </>
  );
};
