import { useQuery } from "@tanstack/react-query";
import { KEY } from ".";
import datasource from "@/datasource/axiosInstance";
import { ContractEvent } from "@/interfaces";
import { useStoreContext } from "@/Context";

const useGetContract = () => {
  const { USER } = useStoreContext();
  return useQuery({
    queryKey: [KEY.contract],
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/contract/bidder/${USER?.id}`,
        // url: `/contract/bidder/${1643}`,
      });
      const data = response.data.data as ContractEvent[];
      return data;
    },
    enabled: !!USER?.id,
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
