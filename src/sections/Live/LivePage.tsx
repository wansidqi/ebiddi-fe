import { Fragment, useEffect, useState } from "react";
import { Container } from "@/components/Container";
import {
  AuctioneerController,
  BidHeader,
  BidderList,
  LiveDetail,
  LiveDialog,
  ReauctionList,
  UseCountdown,
} from "@/sections";
import waiting from "@/assets/images/waiting.png";
import { useStoreContext } from "@/Context";
import { DynamicRenderer, Modal } from "@/components";
import { COUNTDOWN, ROLE } from "@/enum";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate, useParams } from "react-router-dom";
import {
  EyeIcon,
  Info,
  LockKeyholeIcon,
  LucideGavel,
  UnlockKeyhole,
} from "lucide-react";
import { useAPIServices } from "@/services";
import { playAudio } from "@/assets/audio";
import { numWithComma } from "@/lib/utils";
import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function LivePage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const {
    USER,
    subscribeEvent,
    socket,
    setPayload,
    payload,
    publishBid,
    subscribeStatus,
    bidStatus,
    setBidStatus,
    setBidListIndex,
    dev,
    unsubscribeEvent,
    currentPage,
    setCurrentPage,
    subscribeReauction,
    $swal,
    $swalClose,
    updateFlag,
  } = useStoreContext();

  const isNotAuctioneer = USER?.role !== ROLE.AUCTIONEER;

  const [isBidding, setIsBidding] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const {
    useGetCredit,
    useGetEventById,
    useGetLiveAuction,
    usePostAuditTrail,
  } = useAPIServices();
  const { data: event } = useGetEventById(eventId);
  const { data: credits, refetch: getCredit } = useGetCredit( event?.auction_house.id); //prettier-ignore
  const { data: auction, refetch: getAuction } = useGetLiveAuction(payload.auction_id); //prettier-ignore
  const { mutateAsync: postTrail } = usePostAuditTrail();

  const testBid = () => {
    if (!eventId || !USER) return;

    let data = {
      amount: payload.bid.next,
      name: USER?.name,
      user_id: USER?.id,
    };

    setPayload((prev) => {
      const duplciateAmount = prev.bidders.all.some(
        (bidder) => bidder.amount === data.amount
      );

      if (duplciateAmount) {
        return prev;
      }

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
      const duplciateAmount = prev.bidders.all.some(
        (bidder) => bidder.amount === data.amount
      );

      if (duplciateAmount) {
        return prev;
      }

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
    // getAuction();
    setBidStatus(0);

    setPayload((prev) => ({
      ...prev,
      status: "DISPLAY",
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

  // prettier-ignore
  const canBid = () => {
    let cond1 = auction && payload.bid.next < 100000 && getAvailableCredit() >= (auction.deposit + auction.buyer_premium +  auction.security_deposit);
    let cond2 = auction && (payload.bid.next >= 100000 && !auction.is_flat_deposit &&  getAvailableCredit() >= ((0.05 * payload.bid.next) + auction.buyer_premium + auction.security_deposit));
    let cond3 = auction && (payload.bid.next >= 100000 && getAvailableCredit() >=  5000 * (payload.bid.current +  auction.buyer_premium + auction.security_deposit));


    return cond1 || cond2 || cond3;
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

  const { expiryAt } = UseCountdown();

  ///subscribe event
  useEffect(() => {
    if (!eventId) return;

    subscribeEvent({
      event_id: eventId,
      onData: (data) => {
        setPayload(data);

        if (data.status === "CLOSE") {
          setIsBidding(false);
          $swal({
            title: event ? event?.name : "",
            content: `Auction has been closed, that's all for this event`,
            onClick: () => navigate("/events"),
            hasClose: false,
          });
          // navigate("/events");
        }

        if (data.status === "REAUCTIONLIST") {
          reset();
          $swal({
            title: "Redirecting to Reauction List",
            content: `Select lot you wish to be reauction`,
            timer: 3000,
            hasClose: false,
          });
          setCurrentPage("reauctionlist");
        }

        if (data.status === "REAUCTIONLISTUPDATETIMER") {
          setCurrentPage("reauctionlist");

          $swal({
            title: `Reauction Expiry Updated`,
            timer: 3000,
            content: `The new reauction expiry is at ${moment(expiryAt).format("HH:mm:ss")}`,
            hasClose: false,
          });
          reset();
        }

        // prettier-ignore
        if (data.status !== "CLOSE" && auction?.auction_id !== Number(data.auction_id)) {
          // payload.auction_id !== "" && getAuction();
          setCurrentPage("bidding");
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

          if (data.isResume) {
            $swalClose();
            setPayload((prev) => ({ ...prev, isResume: false }));
          }

          if (!updateFlag.current && bidStatus === 0) {
            $swal({
              title: `Lot ${auction?.lot_no}`,
              content: "Bidding is starting",
              timer: 1500,
              hasClose: false,
            });

            playAudio("start");
            setBidStatus(2);
            updateFlag.current = true;
          }

          if (bidStatus === 3) {
            setPayload((prev) => ({ ...prev, countdown: COUNTDOWN.initial }));
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
          $swal({
            title: `Lot ${auction?.lot_no}`,
            content: `Reauction`,
            timer: 1000,
            hasClose: false,
          });

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
              $swal({
                title: `Lot ${auction?.lot_no}`,
                content: `Congratulation, you have won the auction`,
                timer: 3000,
                hasClose: false,
              });
            } else {
              $swal({
                title: `Lot ${auction?.lot_no}`,
                content: `${payload.bidders.highest_user_name} have won the auction`,
                timer: 3000,
                hasClose: false,
              });
            }
          } else {
            //live view (without auth)
            $swal({
              title: `Lot ${auction?.lot_no}`,
              content: `${payload.bidders.highest_user_name} have won the auction`,
              timer: 3000,
              hasClose: false,
            });
          }

          reset();
        }

        if (data.status === "PAUSE") {
          $swal({
            title: `Lot ${auction?.lot_no}`,
            content: `Auctioneer hold auction`,
            noClose: true,
            hasClose: false,
          });
          playAudio("hold");
        }

        if (data.status === "WITHDRAW") {
          setIsBidding(false);
          $swal({
            title: `Lot ${auction?.lot_no}`,
            content: `This auction is withdraw`,
            hasClose: false,
          });
          playAudio("withdraw");
          reset();
        }

        if (data.status === "HOLD") {
          setIsBidding(false);
          $swal({
            title: `Lot ${auction?.lot_no}`,
            content: `No Bid`,
            timer: 3000,
            hasClose: false,
          });
          playAudio("noBid");
          reset();
        }
      },
    });

    return () => {
      unsubscribeEvent(eventId);
    };
  }, [socket, payload]);

  ///subscribe reauction
  useEffect(() => {
    if (!eventId) return;

    subscribeReauction({
      event_id: eventId,
      onData: (data) => {
        if (data.status === "REAUCTIONLISTUPDATE") {
          // console.log("REAUCTIONLISTUPDATE");
          reset();
          setCurrentPage("reauctionlist");

          // setPayload((prev) => ({
          //   ...prev,
          //   holdItems: data.items ?? [],
          //   expiryAt: data.expiryAt ?? "",
          // }));
        }

        if (data.status === "REAUCTIONITEM") {
          $swal({
            title: `Item Reauction`,
            content: `item #${payload.auction_event_id} request for reauction`,
            timer: 1000,
            hasClose: false,
          });
        }
      },
    });
  }, [socket]);

  ///subscribe status
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

  ///render when change auctionId
  useEffect(() => {
    setBidStatus(0);
    $swalClose();
    updateFlag.current = false;
    payload.auction_id !== "" && getAuction();
    payload.auction_id !== "" && getCredit();
  }, [payload.auction_id]);

  return (
    <div>
      <LiveDialog />
      <Container>
        <main>
          <p className="text-3xl sm:text-5xl text-center text-primary">
            AUCTIONS LIVE VIEW
          </p>
          <main className="m-3 flexcenter gap-10">
            <div className="flexcenter gap-2 ">
              <div className="border-2 border-primary rounded-full p-2 text-primary">
                <EyeIcon />
              </div>
              {/* //TODO: total connection */}
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
            <DynamicRenderer.When
              cond={isNotAuctioneer && payload.auction_id === ""}
              // cond={isNotAuctioneer && payload.status === "DISPLAY"}
            >
              <WaitingComponent />
            </DynamicRenderer.When>
            <DynamicRenderer.Else>
              <Fragment>
                <Toaster />
                <BidHeader />
                <div className="flex sm:grid sm:grid-cols-2 w-full overflow-x-auto gap-4 my-4 sm:my-8">
                  <div className="flex-shrink-0 w-[92%] sm:order-2">
                    <LiveDetail auctionId={payload.auction_id} />
                  </div>
                  <div className="flex-shrink-0 w-[92%] sm:order-1">
                    <BidderList />
                  </div>
                </div>

                {USER?.role === ROLE.BIDDER && (
                  <div>
                    {credits?.map((cr, i) => (
                      <>
                        <div key={i} className="flexcenter my-3 sm:my-4 gap-2">
                          {/* <p className="text-primary sm:text-2xl">
                            {cr?.auction_house.name} balance:
                          </p> */}
                          <p className="text-primary sm:text-2xl">
                            Deposit balance:
                          </p>
                          <div className="relative">
                            <p className="text-yellow-500 sm:text-2xl">
                              RM{numWithComma(cr?.amount as number) || 0}
                            </p>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger
                                  className="absolute -right-4 -top-1"
                                  asChild
                                >
                                  <button>
                                    <Info size={"14px"} />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="my-2 text-primary">
                                    {cr?.auction_house.name}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </>
                    ))}
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
                        {isBtnDisabled ? (
                          <LockKeyholeIcon />
                        ) : (
                          <UnlockKeyhole />
                        )}
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
                  </div>
                )}
                {!isNotAuctioneer && <AuctioneerController />}
              </Fragment>
            </DynamicRenderer.Else>
          </DynamicRenderer>
        </main>

        {isNotAuctioneer && (
          <Modal modalState={currentPage === "reauctionlist"}>
            <main>
              <ReauctionList />
            </main>
          </Modal>
        )}
      </Container>
    </div>
  );
}

const WaitingComponent = () => {
  return (
    <div>
      <div className={`flexcenter-col mt-8 text-center gap-4`}>
        <p className="animate-pulse text-3xl">WAITING</p>
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
