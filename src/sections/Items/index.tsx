import { mockEvents } from "@/data";
import { EventsInterface } from "@/interfaces";
import { useState, useEffect } from "react";
import { ItemGridLoading, ItemsGrid, ItemsHeader, ItemsList } from "..";
import { useParams } from "react-router-dom";
import { useAuctionStore } from "@/store";

export function Items() {
  const [events, setEvents] = useState<null | EventsInterface>(null);
  const [loading, setLoading] = useState(true);

  const { eventId } = useParams();
  const { auctions } = useAuctionStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
        <>{loading ? <ItemGridLoading /> : <ItemsGrid events={events} />}</>
      )}
    </div>
  );
}
