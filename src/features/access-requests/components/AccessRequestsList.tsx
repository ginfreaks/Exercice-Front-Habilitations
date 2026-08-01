import { useApplications } from "@/features/applications/api/queries";
import { useRoles } from "@/features/roles/api/queries";
import { useSearchParams } from "react-router-dom";
import { useAccessRequests } from "../api/queries";

import { AccessRequestTable } from "./AccessRequestTable";
import { LoadingBlock } from "@/components/ui/LoadingBlock";
import { ErrorBlock } from "@/components/ui/ErrorBlock";
import { EmptyBlock } from "@/components/ui/EmptyBlock";
import { AccessRequestFilters } from "./AccessRequestFilters";
import { CreateRequestButton } from "./CreateRequestButton";
import { ReviewAccessRequestDialog } from "./ReviewAccessRequestDialog";
import { AccessRequest } from "../types/types";
import { useState } from "react";

export function AccessRequestsList() {
  const [searchParams] = useSearchParams();

  // Lecture des paramètres des filtres du l'URL
  const status = searchParams.get("status") ?? undefined;
  const query = searchParams.get("q") ?? undefined;

  // Recuperation des listes d'applicatios et roles
  const applicationsQuery = useApplications();
  const rolesQuery = useRoles();

  // Récuperation des AccessRequest qui matchent le filtre
  const requestsQuery = useAccessRequests({ status, q: query });

  // Récuperer l'état des appels à partir des Queries (loading & error)
  const isLoading =
    applicationsQuery.isLoading ||
    rolesQuery.isLoading ||
    requestsQuery.isLoading;
  const isError =
    applicationsQuery.isError || rolesQuery.isError || requestsQuery.isError;

  
  const [reviewingRequest, setReviewingRequest] =
    useState<AccessRequest | null>(null);

  // Function pour réessayer le fetch des data dans le cas d'erreur
  function retryAll() {
    if (applicationsQuery.isError) applicationsQuery.refetch();
    if (rolesQuery.isError) rolesQuery.refetch();
    if (requestsQuery.isError) requestsQuery.refetch();
  }
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">
          Demandes d'habilitation
        </h2>
        <CreateRequestButton />
      </div>

      <AccessRequestFilters />
      {isLoading && (
        <div
          className="space-y-2"
          aria-busy="true"
          aria-label="Chargement des demandes"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <LoadingBlock key={i} className="h-10 w-full" />
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <ErrorBlock
          message="Impossible de charger les demandes d'habilitation."
          onRetry={retryAll}
        />
      )}

      {!isLoading && !isError && requestsQuery.data?.length === 0 && (
        <EmptyBlock
          title="Aucune demande trouvée"
          description="Essayez de modifier les filtres ou le terme de recherche."
        />
      )}

      {!isLoading &&
        !isError &&
        requestsQuery.data &&
        requestsQuery.data.length > 0 && (
          <AccessRequestTable
            requests={requestsQuery.data}
            applications={applicationsQuery.data ?? []}
            roles={rolesQuery.data ?? []}
            onReview={setReviewingRequest}
          />
        )}
      <ReviewAccessRequestDialog
        request={reviewingRequest}
        onClose={() => setReviewingRequest(null)}
      />
    </div>
  );
}
