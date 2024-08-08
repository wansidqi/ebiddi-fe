import { SingleEvent, EventLoading } from "@/sections";
import { DynamicRenderer } from "@/components";
import { useStoreContext } from "@/Context";
import { ROLE } from "@/enum";
import { EventsInterface } from "@/interfaces";

export function EventsPageCard({
  isLoading,
  eventAuct,
  data,
  auctLoading,
}: {
  auctLoading: boolean;
  isLoading: boolean;
  eventAuct: EventsInterface[] | undefined;
  data: EventsInterface[] | undefined;
}) {
  const { USER } = useStoreContext();

  const isAuctioneer = USER?.role === ROLE.AUCTIONEER;

  return (
    <>
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
    </>
  );
}
