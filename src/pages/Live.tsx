import { useState } from "react";
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

export function Live() {
  const [isWaiting, _] = useState(false);
  return (
    <div>
      <CallAlert />
      <LiveDialog />
      <Container>
        <p className="text-3xl sm:text-5xl text-center text-primary">
          AUCTIONS LIVE VIEW
        </p>
        <Participator />

        {isWaiting ? (
          <WaitingComponent />
        ) : (
          <>
            <BidCountdown />
            <div className="flex sm:grid sm:grid-cols-2 w-full overflow-x-auto gap-4 my-8">
              <div id="bidding" className="flex-shrink-0 w-full sm:order-1">
                <BidList />
              </div>
              <div id="details" className="flex-shrink-0 w-full sm:order-2">
                <LiveDetail />
              </div>
            </div>
          </>
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
