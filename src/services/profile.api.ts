import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KEY } from ".";
import datasource from "@/datasource/axiosInstance";
import {
  TOKEN,
  getToken,
  setToken,
} from "@/datasource/sessionStorage.datasource";
import {
  ReceiptInterface,
  RefundInterface,
  Transactions,
  User,
} from "@/interfaces";
import { useStoreContext } from "@/Context";

const useGetUserDetail = () => {
  const { SET_USER } = useStoreContext();

  const token = getToken(TOKEN.user);
  const id: number | null = token ? JSON.parse(token).id : null;

  return useQuery({
    queryKey: [KEY.user],
    queryFn: async () => {
      if (id === null) {
        SET_USER(null);
        return null;
      }

      const response = await datasource({
        url: `/profile/${id}`,
        method: "get",
      });

      const data = response.data.data;
      SET_USER(data);

      return data as User;
    },
  });
};

const useChangeEmail = () => {
  const queryClient = useQueryClient();
  const { setAlert, SET_USER } = useStoreContext();

  type Params = {
    id: string;
    email: string;
  };

  return useMutation({
    mutationFn: async (data: Params) => {
      const { email, id } = data;

      const response = await datasource({
        method: "post",
        url: `/profile/${id}/changeemail`,
        data: `email=${email}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      SET_USER(data.data);
      setToken(TOKEN.user, JSON.stringify(data.data));
      queryClient.invalidateQueries([KEY.user]);
      setAlert({
        messsage: "Update Email!",
        showAlert: true,
        isSuccess: true,
      });
    },
    onError: () => {
      setAlert({
        messsage: "Update Email!",
        showAlert: true,
        isSuccess: false,
      });
    },
  });
};

const useGetDepositInfo = (id: string) => {
  return useQuery({
    queryKey: [KEY.depo_info],
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/profile/${id}/credits`,
      });
      const data = response.data;
      return data;
    },
  });
};

const useGetTx = () => {
  const userToken: User = JSON.parse(getToken(TOKEN.user) as string);

  return useQuery({
    queryKey: [KEY.tx],
    queryFn: async () => {
      const response = await datasource({
        method: "get",
        url: `/profile/${userToken.id}/transactions`,
      });
      const data = response.data;
      return data.data as Transactions[];
    },
    refetchOnWindowFocus: false,
  });
};

const useGetReceipt = () => {
  const { USER } = useStoreContext();
  return useQuery({
    queryKey: [KEY.receipt],
    enabled: !!USER?.id,
    queryFn: async () => {
      const response = await datasource({
        url: `/profile/${USER?.id}/receipts`,
        method: "get",
      });
      const data = response.data.data;
      return data as ReceiptInterface[];
    },
  });
};

const usePostReceipt = () => {
  const { USER } = useStoreContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await datasource({
        method: "post",
        url: `/profile/${USER?.id}/uploadreceipt`,
        data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([KEY.receipt]);
      queryClient.invalidateQueries([KEY.user]);
      queryClient.invalidateQueries([KEY.credit]);
    },
  });
};

const useGetRefund = () => {
  const { USER } = useStoreContext();
  return useQuery({
    queryKey: [KEY.refund],
    enabled: !!USER?.id,
    queryFn: async () => {
      const response = await datasource({
        url: `/profile/${USER?.id}/refunds`,
        method: "get",
      });
      const data = response.data.data;
      return data as RefundInterface[];
    },
  });
};

const usePostRefund = () => {
  const { USER } = useStoreContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await datasource({
        method: "post",
        url: `/profile/${USER?.id}/uploadrefund`,
        data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([KEY.refund]);
      queryClient.invalidateQueries([KEY.user]);
      queryClient.invalidateQueries([KEY.credit]);
    },
  });
};

export const ProfileServices = {
  useGetDepositInfo,
  useGetTx,
  useChangeEmail,
  useGetReceipt,
  usePostReceipt,
  useGetRefund,
  usePostRefund,
  useGetUserDetail,
};
