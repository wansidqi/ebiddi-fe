import { Fragment, useEffect, useState } from "react";
import { Container } from "@/components/Container";
import {
  AuctioneerController,
  BidHeader,
  BidList,
  Participator,
} from "@/sections";
import waiting from "@/assets/images/waiting.png";
import { LucideGavel, LockKeyholeIcon, UnlockKeyhole } from "lucide-react";
import { useStoreContext } from "@/Context";
import { DynamicRenderer } from "@/components";
import { ROLE } from "@/interfaces/enum";
import { Toaster } from "@/components/ui/toaster";
import { useParams } from "react-router-dom";

export function Live() {
  const { eventId } = useParams();
  const [toggleLock, setToggleLock] = useState(false);
  const { USER, subscribeEvent, socket, setPayload, payload, setCountdown } =
    useStoreContext();

  useEffect(() => {
    if (!eventId) return;
    subscribeEvent({
      event_id: eventId,
      onData: (data) => {
        setCountdown(data.countdown);
        setPayload(data);
      },
    });
  }, [socket]);

  const isNotAuctioneer = USER?.role !== ROLE.AUCTIONEER;
  const isAuctionIdNotExist = payload.auction_id === "";

  return (
    <div>
      <Toaster />
      <Container>
        <p className="text-3xl sm:text-5xl text-center text-primary">
          AUCTIONS LIVE VIEW
        </p>
        <Participator />

        <DynamicRenderer>
          <DynamicRenderer.When
            cond={false && isNotAuctioneer && isAuctionIdNotExist}
          >
            <WaitingComponent />
          </DynamicRenderer.When>
          <DynamicRenderer.Else>
            <Fragment>
              <BidHeader />
              <div className="flex sm:grid sm:grid-cols-2 w-full overflow-x-auto gap-4 my-8">
                <div id="bidding" className="flex-shrink-0 w-[92%] sm:order-1">
                  <BidList />
                </div>
                <div id="details" className="flex-shrink-0 w-[92%] sm:order-2">
                  {/* <LiveDetail /> */}
                  {/* <LiveDetail {...(data as AuctionInterface)} /> */}
                </div>
              </div>

              {USER?.role === ROLE.BIDDER && (
                <div className="flexcenter gap-6">
                  <button
                    onClick={() => setToggleLock(!toggleLock)}
                    className="bg-green-600 py-3 rounded-md w-full relative sm:w-1/2"
                  >
                    <p>RM 51,500.00</p>
                    <div className="absolute right-10 top-[0.85rem]">
                      <LucideGavel />
                    </div>
                  </button>
                  <div className="flex gap-4">
                    {toggleLock ? <LockKeyholeIcon /> : <UnlockKeyhole />}
                  </div>
                </div>
              )}
              {!isNotAuctioneer && <AuctioneerController />}
            </Fragment>
          </DynamicRenderer.Else>
        </DynamicRenderer>
      </Container>
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
