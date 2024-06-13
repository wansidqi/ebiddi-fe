import { Container } from "@/components/Container";
import { SingleEvent, EventLoading, Term } from "@/sections";
import { useAPIServices } from "@/services";
import { DynamicRenderer } from "@/components";
import { useStoreContext } from "@/Context";
import { ROLE } from "@/interfaces/enum";

export function EventsPage() {
  const { useGetAllEvents, useGetAuctioneerEvent } = useAPIServices();
  const { data, isLoading } = useGetAllEvents();
  const { data: eventAuct, isLoading: auctLoading } = useGetAuctioneerEvent();
  const { USER } = useStoreContext();

  const isAuctioneer = USER?.role === ROLE.AUCTIONEER;

  return (
    <Container className="text-center">
      <div className="flexcenter-col gap-6 ">
        <p className="text-2xl font-bold text-primary">AUCTIONS LIVE VIEW</p>
        <p className="text-4xl">EVENTS</p>
        <p>
          List of auction events that you
          {isAuctioneer ? " handle" : " can participate"}
        </p>
      </div>

      <Term />

      <DynamicRenderer>
        <DynamicRenderer.Else>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
            <DynamicRenderer>
              <DynamicRenderer.When
                cond={isAuctioneer ? auctLoading : isLoading}
              >
                <EventLoading />
                <EventLoading />
                <EventLoading />
                <EventLoading />
                <EventLoading />
                <EventLoading />
              </DynamicRenderer.When>
              <DynamicRenderer.Else>
                {isAuctioneer
                  ? eventAuct?.map((item, i) => (
                      <SingleEvent key={i} {...item} />
                    ))
                  : data?.map((item, i) => <SingleEvent key={i} {...item} />)}
              </DynamicRenderer.Else>
            </DynamicRenderer>
          </div>
        </DynamicRenderer.Else>
      </DynamicRenderer>
    </Container>
  );
}
