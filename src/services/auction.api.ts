import { useMutation, useQuery } from "@tanstack/react-query";
import { KEY } from ".";
import datasource from "@/datasource/axiosInstance";
import { AuctionLiveItem } from "@/interfaces";
import { useStoreContext } from "@/Context";
import { CreditResponse } from "@/interfaces/API";

interface AgreementResponse {
  data: {
    event_name: string;
    agreement_content: string;
  };
}

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

const usePostWithdraw = () => {
  return useMutation({
    mutationFn: async (auction_id: string) => {
      const response = await datasource({
        method: "post",
        url: `/auction/withdraw/${auction_id}`,
      });
      return response.data;
    },
  });
};

const usePostItemSold = () => {
  return useMutation({
    mutationFn: async ({
      auction_id,
      data,
    }: {
      auction_id: string;
      //TODO identify what data need to be posted
      data: any;
    }) => {
      const response = await datasource({
        method: "post",
        url: `/auction/bid/${auction_id}`,
        data,
      });
      return response.data;
    },
  });
};

const usePostAuditTrail = () => {
  return useMutation({
    mutationFn: async ({
      data,
    }: {
      //TODO identify what data need to be posted
      data: any;
    }) => {
      const response = await datasource({
        method: "post",
        url: `/auction/log`,
        data,
      });
      return response.data;
    },
  });
};

export const AuctionService = {
  useGetLiveAuction,
  useGetCredit,
  useGetAgreement,
  usePostConfirmAgreement,
  usePostVerifyAgreement,
  usePostWithdraw,
  usePostItemSold,
  usePostAuditTrail,
};
