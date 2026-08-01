import { http } from "@/types/http";
import { AccessRequest, AccessRequestFilters } from "../types/types";

export function fetchAccessRequests(
  filters: AccessRequestFilters,
): Promise<AccessRequest[]> {
  const params = new URLSearchParams();
  // on récupère les valeurs de recherche et les mettres dans le querystring de l'appel API
  if (filters.status) params.set("status", filters.status);
  if (filters.q) params.set("q", filters.q);
  const qs = params.toString();
  return http<AccessRequest[]>(`/api/access-requests${qs ? `?${qs}` : ""}`);
}

export function fetchAccessRequest(id: string): Promise<AccessRequest> {
  return http<AccessRequest>(`/api/access-request/${id}`);
}
