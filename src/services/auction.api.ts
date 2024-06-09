import { useMutation, useQuery } from "@tanstack/react-query";
import { KEY } from ".";
import datasource from "@/datasource/axiosInstance";
import { AuctionInterface } from "@/interfaces";
import { useStoreContext } from "@/Context";
import { CreditResponse } from "@/interfaces/API";
import { ROLE } from "@/interfaces/enum";

interface AgreementResponse {
  data: {
    event_name: string;
    agreement_content: string;
  };
}

const useGetCredit = (auctionHouseId: string) => {
  const { USER } = useStoreContext();
  return useQuery({
    enabled: !!USER?.id && !Boolean(USER.role === ROLE.AUCTIONEER),
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

const useGetLiveAuction = (auctionId: string) => {
  return useQuery({
    enabled: !!auctionId,
    queryKey: [KEY.auction_item, auctionId],
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/auction/${auctionId}`,
      });
      return response.data.data as AuctionInterface;
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

const usePostItemSold = (options = {}) => {
  return useMutation({
    mutationFn: async ({
      auction_id,
      data,
    }: {
      auction_id: string;
      data: any;
    }) => {
      const response = await datasource({
        method: "post",
        url: `/auction/bid/${auction_id}`,
        data,
      });
      return response.data;
    },
    ...options,
  });
};

const usePostAuditTrail = () => {
  return useMutation({
    mutationFn: async ({ data }: { data: any }) => {
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
