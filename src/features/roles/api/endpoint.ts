import { http } from "@/types/http";
import { Role } from "../types/types";

export function fetchRoles(): Promise<Role[]> {
  return http<Role[]>("/api/roles");
}
