import { useEffect } from "react";
import { ItemGridLoading, ItemsGrid, ItemsHeader, ItemsList } from "..";
import { useParams } from "react-router-dom";
import { useStoreContext } from "@/Context";
import { useAPIServices } from "@/services";

export function Items() {
  const { view } = useStoreContext();
  const { eventId } = useParams();

  useEffect(() => {}, [eventId]);

  const { useGetEventById } = useAPIServices();
  const { data, isLoading } = useGetEventById(eventId as string);

  return (
    <div className="m-2 sm:m-4">
      <ItemsHeader />
      {view === "List" ? (
        <ItemsList events={data} />
      ) : (
        <>{isLoading ? <ItemGridLoading /> : <ItemsGrid events={data} />}</>
      )}
    </div>
  );
}
