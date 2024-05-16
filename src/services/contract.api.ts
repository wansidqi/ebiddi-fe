import { useQuery } from "@tanstack/react-query";
import { KEY } from ".";
import datasource from "@/datasource/axiosInstance";
import { Contract } from "@/interfaces";

interface Response {
  data: Contract[];
}

const useGetContract = (userId: string) => {
  return useQuery({
    queryKey: [KEY.contract],
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/contract/bidder/${userId}`,
      });
      const data = response.data as Response;
      return data.data;
    },
    enabled: !!userId,
  });
};

export const ContractService = { useGetContract };
