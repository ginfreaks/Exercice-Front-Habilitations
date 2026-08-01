import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAccessRequest } from "../api/queries";
import { useApplications } from "../../applications/api/queries";
import { useRoles } from "../../roles/api/queries";
import { ApiError } from "../../../types/http";
import { StatusBadge } from "./StatusBadge";
import { Button } from "../../../components/ui/Button";
import { LoadingBlock } from "@/components/ui/LoadingBlock";
import { ErrorBlock } from "@/components/ui/ErrorBlock";
import { formatDate } from "@/lib/utils";
import { ReviewAccessRequestDialog } from "./ReviewAccessRequestDialog";

export function AccessRequestDetail() {
  const { id } = useParams<{ id: string }>();
  const [reviewing, setReviewing] = useState(false);

  const requestQuery = useAccessRequest(id ?? "");
  const applicationsQuery = useApplications();
  const rolesQuery = useRoles();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (
    requestQuery.isLoading ||
    applicationsQuery.isLoading ||
    rolesQuery.isLoading
  ) {
    return (
      <div className="space-y-2">
        <LoadingBlock className="h-6 w-1/3" />
        <LoadingBlock className="h-40 w-full" />
      </div>
    );
  }

  if (
    requestQuery.error instanceof ApiError &&
    requestQuery.error.status === 404
  ) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 px-6 py-12 text-center">
        <p className="text-sm font-medium text-gray-900">
          Demande introuvable.
        </p>
        <Link to="/" className="text-sm text-indigo-600 hover:underline">
          Retour à la liste
        </Link>
      </div>
    );
  }

  if (requestQuery.isError || applicationsQuery.isError || rolesQuery.isError) {
    return (
      <ErrorBlock
        message="Impossible de charger cette demande."
        onRetry={() => {
          requestQuery.refetch();
          applicationsQuery.refetch();
          rolesQuery.refetch();
        }}
      />
    );
  }

  const request = requestQuery.data!;

  const appName =
    applicationsQuery.data?.find((a) => a.id === request.applicationId)?.name ??
    request.applicationId;
  const roleLabel =
    rolesQuery.data?.find((r) => r.id === request.roleId)?.label ??
    request.roleId;

  return (
    <div className="space-y-4">
      <Link to="/" className="text-sm text-indigo-600 hover:underline">
        Retour à la liste
      </Link>

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            Demande {request.id}
          </h1>
          <StatusBadge status={request.status} />
        </div>

        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-gray-500">Demandeur</dt>
          <dd className="text-gray-900">{request.requesterName}</dd>
          <dt className="text-gray-500">Application</dt>
          <dd className="text-gray-900">{appName}</dd>
          <dt className="text-gray-500">Rôle</dt>
          <dd className="text-gray-900">{roleLabel}</dd>
          <dt className="text-gray-500">Justification</dt>
          <dd className="text-gray-900">{request.reason}</dd>
          <dt className="text-gray-500">Créée le</dt>
          <dd className="text-gray-900">{formatDate(request.createdAt)}</dd>
          {request.reviewedAt && (
            <>
              <dt className="text-gray-500">Traitée le</dt>
              <dd className="text-gray-900">
                {formatDate(request.reviewedAt)}
              </dd>
            </>
          )}
          {request.reviewComment && (
            <>
              <dt className="text-gray-500">Commentaire</dt>
              <dd className="text-gray-900">{request.reviewComment}</dd>
            </>
          )}
        </dl>

        {request.status === "PENDING" && (
          <div className="mt-4">
            <Button onClick={() => setReviewing(true)}>
              Traiter cette demande
            </Button>
          </div>
        )}
      </div>
      <ReviewAccessRequestDialog
        request={reviewing ? request : null}
        onClose={() => setReviewing(false)}
      />
    </div>
  );
}
