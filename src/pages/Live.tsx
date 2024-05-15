import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import {
  BidCountdown,
  BidList,
  CallAlert,
  Detail,
  LiveDetail,
  LiveDialog,
  Participator,
} from "@/sections";
import waiting from "@/assets/images/waiting.png";
import { useAPIServices } from "@/services";
import { useParams } from "react-router-dom";
import { EventsInterface } from "@/interfaces";
import { isCountdown } from "@/lib/utils";

export function Live() {
  const { eventId } = useParams();
  const { useGetEventById } = useAPIServices();
  const { data } = useGetEventById(eventId as string);

  const [isWaiting, _] = useState(true);
  const [timeLeft, setTimeLeft] = useState(
    isCountdown(data?.event_date as string)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = isCountdown(data?.event_date as string);
      if (Object.keys(newTimeLeft).length === 0) {
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const isTimeEnd = Boolean(!Object.keys(timeLeft).length);

  if (!isTimeEnd)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
        <div className="p-8 relative overflow-y-auto bg-background custom-scrollbar sm:w-1/3 rounded-md">
          <div className="text-left mx-auto text-[14px] flex flex-col gap-5 baloo">
            <Detail {...(data as EventsInterface)} />
          </div>
        </div>
      </div>
    );

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
