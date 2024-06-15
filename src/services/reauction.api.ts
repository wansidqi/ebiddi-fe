import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KEY } from ".";
import datasource from "@/datasource/axiosInstance";
import { ReauctionList, ReauctionStatus } from "@/interfaces";

const useGetReauctionList = (eventId: string | undefined) => {
  return useQuery({
    queryKey: [KEY.reauction, eventId],
    enabled: !!eventId,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/auction/reauction/item/event/${eventId}`,
      });
      ///return auctions
      return response.data.data as ReauctionList[];
    },
  });
};

const useGetReauctionStatus = (eventId: string | undefined) => {
  return useQuery({
    queryKey: [KEY.reauctions_status, eventId],
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/auction/reauctionevent/event/${eventId}`,
      });
      ///return expiryAt (response.data.data.expiry_at)
      const data = response.data.data as ReauctionStatus;
      return data;
    },
  });
};

const useGetHoldItems = (eventId: string | undefined) => {
  return useQuery({
    queryKey: [KEY.reauctions_status, eventId],
    enabled: !!eventId,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/auction/item/event/${eventId}/hold`,
      });
      ///return hold
      return response.data.data as ReauctionList[];
    },
  });
};

const usePostReauction = (eventId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      newExpiryAt,
      isCreate,
    }: {
      newExpiryAt: string;
      isCreate: boolean;
    }) => {
      let createTimer = `/auction/reauctionevent`;
      let updateTimer = `/auction/reauctionevent/timer`;
      let url = isCreate ? createTimer : updateTimer;

      const data = `event_id=${eventId}&expiry_at=${newExpiryAt}`;
      const response = await datasource({ method: "post", url, data });
      return response.data.data as ReauctionStatus;
      ///return expiry: (response.data.data.expiry_at)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([KEY.reauction, eventId]);
    },
  });
};

export const ReauctionsServices = {
  useGetReauctionList,
  useGetReauctionStatus,
  useGetHoldItems,
  usePostReauction,
};