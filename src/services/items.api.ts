import datasource from "@/datasource/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { KEY } from ".";
import { ReportInterface } from "@/interfaces";

interface Data {
  data: ReportInterface;
}

const getItemById = async (id: number) => {
  const response = await datasource({ url: `/item/${id}`, method: "get" });
  const data = response.data as Data;
  return data.data;
};

const useGetItemById = (id: number) => {
  return useQuery({
    queryKey: [KEY.item, id],
    queryFn: async () => getItemById(id),
    retry: false,
  });
};

export const ItemService = { useGetItemById };
