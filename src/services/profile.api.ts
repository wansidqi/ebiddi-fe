import { useQuery } from "@tanstack/react-query";
import { KEY } from ".";
import datasource from "@/datasource/axiosInstance";
import { TOKEN, getToken } from "@/datasource/localstorage.datasource";
import { User } from "@/interfaces/API";
import { Transactions } from "@/interfaces";

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
  });
};

export const ProfileServices = { useGetDepositInfo, useGetTx };
