import { useEffect } from "react";
import { ItemGridLoading, ItemsGrid, ItemsHeader, ItemsList } from "..";
import { useParams } from "react-router-dom";
import { useStoreContext } from "@/Context";
import { useAPIServices } from "@/services";
import { Container } from "@/components/Container";
import { SearchFilter } from "@/components";

export function Items() {
  const { view } = useStoreContext();
  const { eventId } = useParams();

  useEffect(() => {}, [eventId]);

  const { useGetEventById } = useAPIServices();
  const { data, isLoading } = useGetEventById(eventId);

  const inventories = data?.inventories;

  const { SearchFilterUI, dataList } = SearchFilter(inventories, [
    "model",
    "year",
    "reserve_price",
    "registration_number",
    "legal_owner",
    "lot_no",
  ]);

  return (
    <Container className="">
      <ItemsHeader />
      <div className="flex justify-center md:justify-end my-5">
        {SearchFilterUI}
      </div>
      {view === "List" ? (
        <ItemsList inventories={dataList} />
      ) : (
        <>
          {isLoading ? (
            <ItemGridLoading />
          ) : (
            <ItemsGrid inventories={dataList} />
          )}
        </>
      )}
    </Container>
  );
}
