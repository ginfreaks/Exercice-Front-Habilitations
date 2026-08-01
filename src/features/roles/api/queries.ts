import { useQuery } from "@tanstack/react-query";
import { fetchRoles } from "./endpoint";

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
    staleTime: 5 * 60_000,
  });
}
