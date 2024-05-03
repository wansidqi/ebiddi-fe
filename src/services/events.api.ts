import datasource from "@/datasource/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { KEY } from ".";
import { EventsInterface } from "@/interfaces";

interface EventsResponse {
  data: EventsInterface[];
}

interface EventResponse {
  data: EventsInterface;
}

const useGetAllEvents = () => {
  return useQuery({
    queryKey: [KEY.events],
    queryFn: async () => {
      const response = await datasource({ url: "/events", method: "get" });
      const data = response.data as EventsResponse;
      return data.data as EventsInterface[];
    },
    retry: false,
  });
};

const useGetEventById = (id: string) => {
  return useQuery({
    queryKey: [KEY.event, id],
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

export const EventService = { useGetAllEvents, useGetEventById };
