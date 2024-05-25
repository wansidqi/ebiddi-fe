import { useQuery } from "@tanstack/react-query";
import { KEY } from ".";
import datasource from "@/datasource/axiosInstance";
import { AuctionLiveItem } from "@/interfaces";
import { useStoreContext } from "@/Context";
import { CreditResponse } from "@/interfaces/API";

const useGetCredit = (auctionHouseId: string) => {
  const { USER } = useStoreContext();
  return useQuery({
    enabled: !!USER?.id,
    queryKey: [KEY.credit, auctionHouseId],
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/profile/${USER?.id}/auctionhouse/${auctionHouseId}/credits`,
      });
      const data = response.data as CreditResponse;
      return data.data[0];
    },
  });
};

const useGetLiveAuction = (itemId: number) => {
  return useQuery({
    enabled: !!itemId,
    queryKey: [KEY.auction_item, itemId],
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/auction/${itemId}`,
      });
      return response.data.data as AuctionLiveItem;
    },
  });
};

export const LiveService = { useGetLiveAuction, useGetCredit };
