import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  ApiError, http } from "../../../types/http";

import { keysList } from "./queries";
import { AccessRequest, ReviewValues } from "../types/types";
import { CreateRequestValues } from "../schemas/createRequest.schema";
import { toast } from "sonner";

function createAccessRequest(
  values: CreateRequestValues,
): Promise<AccessRequest> {
  return http<AccessRequest>("/api/access-requests", {
    method: "POST",
    body: JSON.stringify(values),
  });
}

//Création d'une demande Access Request
export function useCreateAccessRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAccessRequest,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keysList.lists() });
    },
  });
}


function reviewAccessRequest(
  id: string,
  values: ReviewValues,
): Promise<AccessRequest> {
  return http<AccessRequest>(`/api/access-requests/${id}/review`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
}

export function useReviewAccessRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: ReviewValues }) =>
      reviewAccessRequest(id, values),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: keysList.lists() });
      queryClient.invalidateQueries({ queryKey: keysList.detail(id) });
      toast.success("Demande traitée avec succès.");
    },
    onError: (error, { id }) => {
      if (error instanceof ApiError && error.status === 409) {
        toast.error("Cette demande a été déjà traitée.");
        queryClient.invalidateQueries({ queryKey: keysList.lists() });
        queryClient.invalidateQueries({ queryKey: keysList.detail(id) });
      } else if (error instanceof ApiError && error.status === 404) {
        toast.error("Cette demande n'existe plus.");
        queryClient.invalidateQueries({ queryKey: keysList.lists() });
      } else {
        toast.error(error.message);
      }
    },
  });
}