import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AccessRequestFilters } from "../types/types";
import { fetchAccessRequest, fetchAccessRequests } from "./endpoint";

// la liste de tous les keys qu'on va avoir
export const keysList = {
  all: ["access-requests"] as const,
  lists: () => [...keysList.all, "list"] as const,
  list: (filters: { status?: string; q?: string }) =>
    [...keysList.lists(), filters] as const,
  detail: (id: string) => [...keysList.all, "detail", id] as const,
};

export function useAccessRequests(filters: AccessRequestFilters) {
  return useQuery({
    queryKey: keysList.list(filters),
    queryFn:()=> fetchAccessRequests(filters),
    placeholderData: keepPreviousData
  });
}

export function useAccessRequest(id: string) {
  return useQuery({
    queryKey: keysList.detail(id),
    queryFn: () => fetchAccessRequest(id),
    enabled:Boolean(id)
  });
}
