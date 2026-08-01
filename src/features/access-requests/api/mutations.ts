import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  http } from "../../../types/http";

import { keysList } from "./queries";
import { AccessRequest } from "../types/types";
import { CreateRequestValues } from "../schemas/createRequest.schema";

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