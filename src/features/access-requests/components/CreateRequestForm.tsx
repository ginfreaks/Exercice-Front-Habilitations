import { Button } from "@/components/ui/Button";
import { useApplications } from "@/features/applications/api/queries";
import { useRoles } from "@/features/roles/api/queries";
import { ApiError } from "@/types/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateAccessRequest } from "../api/mutations";
import { createRequestSchema, CreateRequestValues } from "../schemas/createRequest.schema";

export function CreateRequestForm({ onSuccess }: { onSuccess: () => void }) {
  // Récupération des informations application /roles
  const applicationsQuery = useApplications();
  const rolesQuery = useRoles();
  const createRequest = useCreateAccessRequest();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateRequestValues>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: { requesterName: "", applicationId: "", roleId: "" },
  });

  const onSubmit = handleSubmit((values) => {
    createRequest.mutate(values, {
      onSuccess: () => {
        toast.success("Demande créée avec succès.");
        onSuccess();
      },
      onError: (error) => {
        if (error instanceof ApiError && error.status === 400 && error.errors) {
          Object.entries(error.errors).forEach(([field, message]) => {
            setError(field as keyof CreateRequestValues, { message });
          });
        } else {
          toast.error(error.message);
        }
      },
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label
          htmlFor="requesterName"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Nom du demandeur
        </label>
        <input
          id="requester-name"
          type="text"
          {...register("requesterName")}
          className="w-full rounded-md border border-gray-700 px-3 py-2 text-sm"
        />
        {errors.requesterName && (
          <p id="requesterName-error" className="mt-1 text-sm text-red-600">
            {errors.requesterName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="applicationId"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Application
        </label>
        <select
          id="applicationId"
          {...register("applicationId")}
          disabled={applicationsQuery.isLoading}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Sélectionner une application</option>
          {applicationsQuery.data?.map((app) => (
            <option key={app.id} value={app.id}>
              {app.name}
            </option>
          ))}
        </select>
        {errors.applicationId && (
          <p id="applicationId-error" className="mt-1 text-sm text-red-600">
            {errors.applicationId.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="roleId"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Rôle
        </label>

        <select
          id="roleId"
          {...register("roleId")}
          disabled={rolesQuery.isLoading}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Sélectionner un rôle</option>
          {rolesQuery.data?.map((role) => (
            <option key={role.id} value={role.id}>
              {role.label}
            </option>
          ))}
        </select>
        {errors.roleId && (
          <p id="roleId-error" className="mt-1 text-sm text-red-600">
            {errors.roleId.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="reason"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Justification
        </label>
        <textarea
          id="reason"
          rows={3}
          {...register("reason")}
          aria-invalid={!!errors.reason}
          aria-describedby={errors.reason ? "reason-error" : undefined}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        {errors.reason && (
          <p id="reason-error" className="mt-1 text-sm text-red-600">
            {errors.reason.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting || createRequest.isPending}
        >
          {createRequest.isPending ? "Envoi..." : "Créer la demande"}
        </Button>
      </div>
    </form>
  );
}
