export interface AccessRequestFilters {
  status?: string;
  q?: string;
}

export type AccessRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AccessRequest {
  id: string;
  requesterName: string;
  applicationId: string;
  roleId: string;
  reason: string;
  status: AccessRequestStatus;
  createdAt: string;
  reviewedAt: string | null;
  reviewComment: string | null;
}


