import { http } from "@/types/http";
import { Application } from "../types/types";

export function fetchApplications(): Promise<Application[]> {
  return http<Application[]>("/api/applications");
}
