import { Container } from "@/components/Container";
import { EventCard, EventLoading } from "@/sections";
import { useAPIServices } from "@/services";

export function Events() {
  const { useGetAllEvents } = useAPIServices();
  const { data, isLoading } = useGetAllEvents();

  return (
    <Container className="text-center">
      <div className="flexcenter-col gap-6">
        <p className="text-2xl font-bold text-primary">AUCTIONS LIVE VIEW</p>
        <p className="text-4xl">EVENTS</p>
        <p>List of auction events that you can participate</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
        {isLoading ? (
          <>
            <EventLoading />
            <EventLoading />
            <EventLoading />
          </>
        ) : (
          <>{data?.map((item, i) => <EventCard key={i} {...item} />)}</>
        )}
      </div>
    </Container>
  );
}
