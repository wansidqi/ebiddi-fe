import { Fragment, useState } from "react";
import { Container } from "@/components/Container";
import {
  BidCountdown,
  BidList,
  CallAlert,
  LiveDetail,
  LiveDialog,
  Participator,
} from "@/sections";
import waiting from "@/assets/images/waiting.png";
import { useAPIServices } from "@/services";
import { useParams } from "react-router-dom";
import { AuctionLiveItem } from "@/interfaces";
import { LucideGavel, LockKeyholeIcon, UnlockKeyhole } from "lucide-react";

export function Live() {
  const [toggleLock, setToggleLock] = useState(false);

  const { eventId } = useParams();
  const { useGetEventById, useGetLiveAuction } = useAPIServices();
  const { data: events } = useGetEventById(eventId as string);
  const firstItem = events?.inventories[0].auction_id as number;
  const { data } = useGetLiveAuction(firstItem);

  return (
    <div>
      <CallAlert />
      <LiveDialog />
      <Container>
        <p className="text-3xl sm:text-5xl text-center text-primary">
          AUCTIONS LIVE VIEW
        </p>
        <Participator />

        {events?.status === "Deactive" ? (
          <WaitingComponent />
        ) : (
          <Fragment>
            <BidCountdown />

            <div className="flex sm:grid sm:grid-cols-2 w-full overflow-x-auto gap-4 my-8">
              <div id="bidding" className="flex-shrink-0 w-[92%] sm:order-1">
                <BidList />
              </div>
              <div id="details" className="flex-shrink-0 w-[92%] sm:order-2">
                <LiveDetail {...(data as AuctionLiveItem)} />
              </div>
            </div>

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
          </Fragment>
        )}
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
