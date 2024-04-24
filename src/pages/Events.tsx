import { Container } from "@/components/Container";
import { mockEvents } from "@/data";
import { EventCard, EventLoading } from "@/sections";
import { useState, useEffect } from "react";

export function Events() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="text-center">
      <div className="flexcenter-col gap-6">
        <p className="text-2xl font-bold text-primary">AUCTIONS LIVE VIEW</p>
        <p className="text-4xl">EVENTS</p>
        <p>List of auction events that you can participate</p>
      </div>

      {loading ? (
        <EventLoading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10">
          {mockEvents.map((item, i) => (
            <EventCard key={i} {...item} />
          ))}
        </div>
      )}
    </Container>
  );
}
