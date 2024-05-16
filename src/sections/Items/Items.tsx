import { useEffect } from "react";
import { ItemGridLoading, ItemsGrid, ItemsHeader, ItemsList } from "..";
import { useParams } from "react-router-dom";
import { useStoreContext } from "@/Context";
import { useAPIServices } from "@/services";
import { Container } from "@/components/Container";

export function Items() {
  const { view } = useStoreContext();
  const { eventId } = useParams();

  useEffect(() => {}, [eventId]);

  const { useGetEventById } = useAPIServices();
  const { data, isLoading } = useGetEventById(eventId as string);

  return (
    <Container className="">
      <ItemsHeader />
      {view === "List" ? (
        <ItemsList events={data} />
      ) : (
        <>{isLoading ? <ItemGridLoading /> : <ItemsGrid events={data} />}</>
      )}
    </Container>
  );
}
