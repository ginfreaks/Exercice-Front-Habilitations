import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "./endpoint";

// Utilisation de useQuery de tanstack, pour avoir un accès aux états de l'appel par la suite
export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
    staleTime: 5 * 60_000,
  });
}
