import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { EventService } from "./events.api";

export enum KEY {
  events = "EVENTS",
  event = "EVENT",
}

export function useGetQueryData<T>(key: QueryKey): T {
  return useQueryClient().getQueryData(key) as T;
}

export const useAPIServices = () => ({
  ...EventService,
});
