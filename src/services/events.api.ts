import datasource from "@/datasource/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { KEY } from ".";
import { EventsInterface } from "@/interfaces";

interface EventsResponse {
  data: EventsInterface[];
}

interface EventResponse {
  data: EventsInterface;
}

interface AgreementResponse {
  data: {
    event_name: string;
    agreement_content: string;
  };
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

const useGetAgreement = (eventId: string) => {
  return useQuery({
    queryKey: [KEY.agreement],
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/auction/${eventId}/agreement`,
      });
      const data = response.data as AgreementResponse;
      return data.data;
    },
    enabled: !!eventId,
  });
};

const usePostConfirmAgreement = () => {
  type Param = {
    user_id: number;
    event_id: number;
  };

  return useMutation({
    mutationFn: async (data: Param) => {
      const response = await datasource({
        method: "post",
        url: "/auction/agreement/confirm",
        data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data;
    },
  });
};

const usePostVerifyAgreement = () => {
  type Param = {
    user_id: number;
    event_id: number;
  };

  return useMutation({
    mutationFn: async (data: Param) => {
      const response = await datasource({
        method: "post",
        url: "/auction/agreement/verify",
        data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data;
    },
  });
};

/* if !usePostVerifyAgreement -> useGetAgreement -> usePostConfirmAgreement  */

export const EventService = {
  useGetAllEvents,
  useGetEventById,
  useGetAgreement,
  usePostConfirmAgreement,
  usePostVerifyAgreement,
};
