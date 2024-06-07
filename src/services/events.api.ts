import datasource from "@/datasource/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { KEY } from ".";
import { EventsInterface } from "@/interfaces";
import { useStoreContext } from "@/Context";

interface EventsResponse {
  data: EventsInterface[];
}

interface EventResponse {
  data: EventsInterface;
}

const useGetAllEvents = () => {
  return useQuery({
    queryKey: [KEY.events],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await datasource({ url: "/events", method: "get" });
      const data = response.data as EventsResponse;
      return data.data as EventsInterface[];
    },
    retry: false,
  });
};

const useGetAuctioneerEvent = () => {
  const { USER } = useStoreContext();
  let id = USER?.id;
  // let id = 2449;

  return useQuery({
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryKey: [KEY.auctioneer, id],
    queryFn: async () => {
      const response = await datasource({ url: `/events/auctioneer/${id}` });
      const data = response.data;
      return data.data as EventsInterface[];
    },
  });
};

const useGetEventById = (id: string) => {
  return useQuery({
    queryKey: [KEY.event, id],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await datasource({
        url: `/events/${id}`,
        method: "get",
      });
      const data = response.data as EventResponse;
      return data.data as EventsInterface;
    },
    retry: false,
  });
};

export const EventService = {
  useGetAllEvents,
  useGetEventById,
  useGetAuctioneerEvent,
};
