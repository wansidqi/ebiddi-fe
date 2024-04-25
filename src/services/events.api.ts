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

const getAllEvents = async () => {
  const response = await datasource({ url: "/events", method: "get" });
  const data = response.data as EventsResponse;
  return data.data as EventsInterface[];
};

const getEventById = async (id: string) => {
  const response = await datasource({ url: `/events/${id}`, method: "get" });
  const data = response.data as EventResponse;
  return data.data as EventsInterface;
};

const useGetAllEvents = () => {
  getAllEvents();
  return useQuery({
    queryKey: [KEY.events],
    queryFn: async () => getAllEvents(),
    retry: false,
  });
};

const useGetEventById = (id: string) => {
  getAllEvents();
  return useQuery({
    queryKey: [KEY.event, id],
    queryFn: async () => getEventById(id),
    retry: false,
  });
};

export const EventService = { useGetAllEvents, useGetEventById };
