import { useQuery } from "@tanstack/react-query";
import { KEY } from ".";
import datasource from "@/datasource/axiosInstance";
import { ContractEvent } from "@/interfaces";

const useGetContract = (userId: string) => {
  return useQuery({
    queryKey: [KEY.contract],
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/contract/bidder/${userId}`,
      });
      const data = response.data.data as ContractEvent[];
      return data;
    },
    enabled: !!userId,
  });
};

const useGetContractByEvent = (eventId: string | undefined) => {
  return useQuery({
    queryKey: [KEY.contract],
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/contract/event/${eventId}`,
      });
      const data = response.data.data as ContractEvent[];
      return data;
    },
    enabled: !!eventId,
  });
};

export const ContractService = { useGetContract, useGetContractByEvent };
