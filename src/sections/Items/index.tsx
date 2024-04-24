import { mockEvents } from "@/data";
import { EventsInterface } from "@/interfaces";
import { useState, useEffect } from "react";
import { ItemsGrid, ItemsHeader, ItemsList } from "..";
import { useParams } from "react-router-dom";
import { useAuctionStore } from "@/store";

export function Items() {
  const [events, setEvents] = useState<null | EventsInterface>(null);

  const { eventId } = useParams();
  const { auctions } = useAuctionStore();

  useEffect(() => {
    const findEventById = mockEvents.find((event) => event.id === eventId);
    if (findEventById) {
      setEvents(findEventById);
    }
  }, [eventId]);

  return (
    <div className="m-2  sm:m-4">
      <ItemsHeader />
      {auctions.view === "List" ? (
        <ItemsList events={events} />
      ) : (
        <ItemsGrid events={events} />
      )}
    </div>
  );
}
