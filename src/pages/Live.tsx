import { Fragment, useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import {
  AuctioneerController,
  BidHeader,
  BidderList,
  LiveDetail,
  LiveDialog,
} from "@/sections";
import waiting from "@/assets/images/waiting.png";
import { useStoreContext } from "@/Context";
import { DynamicRenderer } from "@/components";
import { ROLE } from "@/interfaces/enum";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate, useParams } from "react-router-dom";
import {
  EyeIcon,
  LockKeyholeIcon,
  LucideGavel,
  UnlockKeyhole,
} from "lucide-react";
import { useAPIServices } from "@/services";
import { playAudio } from "@/assets/audio";
import { numWithComma } from "@/lib/utils";

export function Live() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const {
    USER,
    subscribeEvent,
    socket,
    setPayload,
    payload,
    setCountdown,
    publishBid,
    subscribeStatus,
    biddingModal,
    bidStatus,
    setBidStatus,
    setBidListIndex,
    dev,
    unsubscribeEvent,
  } = useStoreContext();

  const {
    closeModal,
    setCloseModal,
    startModal,
    setStartModal,
    reauctionModal,
    setReauctionModal,
    otherWinner,
    selfWinner,
    setOtherWinner,
    setSelfWinner,
    pause,
    setPause,
    withdraw,
    setWithdraw,
    hold,
    setHold,
  } = biddingModal;

  const isNotAuctioneer = USER?.role !== ROLE.AUCTIONEER;
  const isAuctionIdNotExist = payload.auction_id === "";

  const updateFlag = useRef(false);
  const [isBidding, setIsBidding] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const {
    useGetCredit,
    useGetEventById,
    useGetLiveAuction,
    usePostAuditTrail,
  } = useAPIServices();
  const { data: event } = useGetEventById(eventId);
  const { data: credits } = useGetCredit(event?.auction_house.id);
  const { data: auction, refetch } = useGetLiveAuction(payload.auction_id);
  const { mutateAsync: postTrail } = usePostAuditTrail();

  const testBid = () => {
    if (!eventId || !USER) return;

    let data = {
      amount: payload.bid.next,
      name: USER?.name,
      user_id: USER?.id,
    };

    setPayload((prev) => {
      const updatedPayload = {
        ...prev,
        bidders: {
          all: [data, ...prev.bidders.all],
          highest_amount: data.amount,
          highest_user_id: data.user_id,
          highest_user_name: data.name,
        },
      };

      setBidListIndex(0);

      publishBid({
        auction_id: payload.auction_id,
        event_id: eventId,
        data: data,
      });

      return updatedPayload;
    });
  };

  const clickBid = () => {
    if (!eventId || !USER) return;
    sendAuditTrail(payload.bid.next);

    let data = {
      amount: payload.bid.next,
      name: USER?.name,
      user_id: USER?.id,
    };

    setPayload((prev) => {
      const updatedPayload = {
        ...prev,
        bidders: {
          all: [data, ...prev.bidders.all],
          highest_amount: data.amount,
          highest_user_id: data.user_id,
          highest_user_name: data.name,
        },
      };

      setBidListIndex(0);

      publishBid({
        auction_id: payload.auction_id,
        event_id: eventId,
        data: data,
      });

      return updatedPayload;
    });
  };

  const isBidDisabled = () => {
    if (isBtnDisabled) {
      return true;
    }

    if (!isBidding) {
      return true;
    }

    if (!canBid()) {
      return true;
    }

    if (payload.bidders.highest_user_id === USER?.id) {
      return true;
    }

    return false;
  };

  const reset = () => {
    refetch();
    setBidStatus(0);

    setPayload((prev) => ({
      ...prev,
      bidders: {
        all: [],
        highest_amount: prev.bidders.highest_amount,
        highest_user_id: 0,
        highest_user_name: "",
      },
      bid: {
        current: 0,
        next: 0,
        start: prev.bid.start,
        up: prev.bid.up,
      },
    }));
  };

  const canBid = () => {
    if (auction) {
      return (
        (payload.bid.next < 100000 &&
          getAvailableCredit() >=
            auction.deposit +
              auction.buyer_premium +
              auction.security_deposit) ||
        (payload.bid.next >= 100000 &&
          getAvailableCredit() >=
            0.05 * payload.bid.current +
              auction.buyer_premium +
              auction.security_deposit)
      );
    }
  };

  const getAvailableCredit = () => {
    if (credits) {
      let amount = 0;
      let i;
      for (i = 0; i < credits.length; i++) {
        const credit = credits[i];
        if (credit.amount > amount) {
          amount = credit.amount;
        }
      }

      return amount;
    } else {
      return 0;
    }
  };

  const showNumber = () => {
    if (!isBidding) {
      return "WAITING";
    }

    if (payload.bidders.highest_user_id === USER?.id) {
      return "HIGHEST BID";
    }

    if (!canBid()) {
      return "INSUFFICIENT DEPOSIT";
    }

    return payload.bid.next;
  };

  const sendAuditTrail = (amount: string | number) => {
    if (!auction || !auction.auction_id) {
      return;
    }

    let data = `event_id=${eventId}`;
    data += `&auction_id=${auction.auction_id}`;
    data += "&type=BID";
    data += `&user_id=${USER?.id}`;
    data += `&bid_amount=${amount}`;

    postTrail({ data });
  };

  useEffect(() => {
    if (!eventId) return;

    subscribeEvent({
      event_id: eventId,
      onData: (data) => {
        setCountdown(data.countdown);
        setPayload(data);

        if (data.status === "CLOSE") {
          setIsBidding(false);
          setCloseModal(true);
          // navigate("/events");
        }

        if (
          data.status !== "CLOSE" &&
          auction?.auction_id !== Number(data.auction_id)
        ) {
          payload.auction_id !== "" && refetch();
          setPayload((prev) => ({
            ...prev,
            bid: {
              current: data.bid.start,
              next: data.bid.next,
              start: prev.bid.start,
              up: prev.bid.up,
            },
            bidders: {
              all: [],
              highest_amount: prev.bidders.highest_amount,
              highest_user_id: prev.bidders.highest_user_id,
              highest_user_name: prev.bidders.highest_user_name,
            },
          }));
        }

        if (!payload.auction_id) return;

        if (data.status === "AUCTION") {
          setIsBidding(true);

          if (bidStatus === 0 && !updateFlag.current) {
            setStartModal(true);
            playAudio("start");
            setBidStatus(2);
            updateFlag.current = true; // Set the flag to true after initial update
          }

          if (bidStatus === 3) {
            setCountdown(11);
          }

          if (isBidding) {
            if (payload.bidders.all.length >= data.bidders.all.length) return;

            setPayload((prev) => ({
              ...prev,
              bidders: {
                all: data.bidders.all,
                highest_amount: prev.bidders.highest_amount,
                highest_user_id: prev.bidders.highest_user_id,
                highest_user_name: prev.bidders.highest_user_name,
              },
            }));

            if (payload.bid.current < data.bid.current) {
              setPayload((prev) => ({
                ...prev,
                bid: {
                  current: data.bidders.highest_amount,
                  next: prev.bid.next,
                  start: prev.bid.start,
                  up: prev.bid.up,
                },
              }));
            }

            if (payload.bid.next !== data.bid.next) {
              setPayload((prev) => ({
                ...prev,
                bid: {
                  next: data.bid.next,
                  current: prev.bid.current,
                  start: prev.bid.start,
                  up: prev.bid.up,
                },
              }));
            }

            setPayload((prev) => ({
              ...prev,
              bidders: {
                highest_user_id: data.bidders.highest_user_id,
                highest_user_name: data.bidders.highest_user_name,
                all: prev.bidders.all,
                highest_amount: prev.bidders.highest_amount,
              },
            }));

            setBidStatus(2);
          }
        }

        if (data.status === "REAUCTION") {
          setReauctionModal(true);
          playAudio("reauction");
          reset();
          setIsBidding(false);

          setPayload((prev) => ({
            ...prev,
            bid: {
              current: data.bid.current,
              next: data.bid.next,
              start: prev.bid.start,
              up: prev.bid.up,
            },
          }));
        }

        if (data.status === "SOLD") {
          setIsBidding(false);
        }

        if (data.status === "END") {
          playAudio("sold");

          if (USER) {
            if (data.bidders.highest_user_id === USER.id) {
              setSelfWinner(true);
            } else {
              setOtherWinner(true);
            }
          } else {
            //live view (without auth)
            setOtherWinner(true);
          }

          reset();
        }

        if (data.status === "PAUSE") {
          setPause(true);
          playAudio("hold");
        }

        if (data.status === "WITHDRAW") {
          setIsBidding(false);
          setWithdraw(true);
          playAudio("withdraw");
          reset();
        }

        if (data.status === "HOLD") {
          setIsBidding(false);
          setHold(true);
          playAudio("withdraw");
          reset();
        }
      },
    });

    return () => {
      unsubscribeEvent(eventId);
    };
  }, [socket, payload]);

  useEffect(() => {
    if (!eventId) return;
    // console.log("render sub status");
    subscribeStatus({
      event_id: eventId,
      onData: (data) => {
        console.log(data.channel);
        console.log(data.data.total_bidder);
        console.log(data.data.total_connection);
      },
    });
  }, [socket]);

  useEffect(() => {
    if (payload.auction_id) {
      refetch();
      updateFlag.current = false;
    }
  }, [payload.auction_id]);

  return (
    <div>
      <Toaster />
      <Container>
        <p className="text-3xl sm:text-5xl text-center text-primary">
          AUCTIONS LIVE VIEW
        </p>

        <main className="m-3 flexcenter gap-10">
          <div className="flexcenter gap-2 ">
            <div className="border-2 border-primary rounded-full p-2 text-primary">
              <EyeIcon />
            </div>
            <p className="pt-1">888</p>
          </div>
          <div className="flexcenter gap-2 ">
            <div className="border-2 border-primary rounded-full p-2 text-primary">
              <LucideGavel />
            </div>
            <p className="pt-1">888</p>
          </div>
        </main>

        <DynamicRenderer>
          <DynamicRenderer.When cond={isNotAuctioneer && isAuctionIdNotExist}>
            {/* <DynamicRenderer.When cond={false}> */}
            <WaitingComponent />
          </DynamicRenderer.When>
          <DynamicRenderer.Else>
            <Fragment>
              <BidHeader />
              <div className="flex sm:grid sm:grid-cols-2 w-full overflow-x-auto gap-4 my-8">
                <div id="bidding" className="flex-shrink-0 w-[92%] sm:order-1">
                  <BidderList />
                </div>
                <div id="details" className="flex-shrink-0 w-[92%] sm:order-2">
                  <LiveDetail auctionId={payload.auction_id} />
                </div>
              </div>

              {USER?.role === ROLE.BIDDER && (
                <div className="flexcenter gap-6">
                  <button
                    disabled={isBidDisabled()}
                    onClick={clickBid}
                    className={`${isBidDisabled() ? "bg-green-400" : "bg-green-600"}  py-3 rounded-md w-full relative sm:w-1/2`}
                  >
                    <p>
                      {typeof showNumber() === "number"
                        ? `RM${numWithComma(showNumber() as number)}`
                        : showNumber()}
                    </p>
                    <div className="absolute right-10 top-[0.85rem]">
                      <LucideGavel />
                    </div>
                  </button>
                  <button
                    onClick={() => setIsBtnDisabled((prev) => !prev)}
                    className="flex gap-4"
                  >
                    {isBtnDisabled ? <LockKeyholeIcon /> : <UnlockKeyhole />}
                  </button>
                  {dev && (
                    <button
                      onClick={testBid}
                      className="px-3 py-2 bg-blue-600 rounded-md"
                    >
                      test bid
                    </button>
                  )}
                </div>
              )}
              {!isNotAuctioneer && <AuctioneerController />}
            </Fragment>
          </DynamicRenderer.Else>
        </DynamicRenderer>
      </Container>

      <LiveDialog
        state={closeModal}
        handleState={setCloseModal}
        title={event ? event?.name : ""}
        content={`Auction has been closed, that's all for this event`}
        onClick={() => navigate("/events")}
      />
      <LiveDialog
        state={startModal}
        handleState={setStartModal}
        title={`Lot ${auction?.lot_no}`}
        content={`Bidding is starting`}
        timer={1000}
        onClick={() => {}}
      />
      <LiveDialog
        state={reauctionModal}
        handleState={setReauctionModal}
        title={`Lot ${auction?.lot_no}`}
        content={`Reauction`}
        timer={1000}
        onClick={() => {}}
      />
      <LiveDialog
        state={selfWinner}
        handleState={setSelfWinner}
        title={`Lot ${auction?.lot_no}`}
        content={`Congratulation, you have won the auction`}
        timer={3000}
        onClick={() => {}}
      />
      <LiveDialog
        state={otherWinner}
        handleState={setOtherWinner}
        title={`Lot ${auction?.lot_no}`}
        content={`${payload.bidders.highest_user_name} have won the auction`}
        timer={3000}
        onClick={() => {}}
      />
      <LiveDialog
        state={pause}
        handleState={setPause}
        title={`Lot ${auction?.lot_no}`}
        content={`Auctioneer hold auction`}
        onClick={() => {}}
      />
      <LiveDialog
        state={withdraw}
        handleState={setWithdraw}
        title={`Lot ${auction?.lot_no}`}
        content={`This auction is withdraw`}
        onClick={() => {}}
      />
      <LiveDialog
        state={hold}
        handleState={setHold}
        title={`Lot ${auction?.lot_no}`}
        content={`No Bid`}
        onClick={() => {}}
      />
    </div>
  );
}

const WaitingComponent = () => {
  return (
    <div>
      <div className={`flexcenter-col mt-8 text-center gap-4`}>
        <p className="text-3xl">WAITING</p>
        <img className="scale-[0.8] sm:scale-[1]" src={waiting} alt="" />
        <p>
          Please be patient, we are still waiting for Auctioneer input. The
          auction will start soon. Do not leave this page until the auction
          starts. Thank you.
        </p>
      </div>
    </div>
  );
};
