import { Application } from "@/features/applications/types/types";
import { AccessRequest } from "../types/types";
import { Role } from "@/features/roles/types/types";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "@/lib/utils";

interface AccessRequestTableProps {
  requests: AccessRequest[];
  applications: Application[];
  roles: Role[];
}

export function AccessRequestTable({
  requests,
  applications,
  roles,
}: AccessRequestTableProps) {
  const appName = (id: string) =>
    applications.find((a) => a.id === id)?.name ?? id;
  const roleLabel = (id: string) => roles.find((r) => r.id === id)?.label ?? id;

   return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-2 text-left font-medium text-gray-600">Demandeur</th>
            <th scope="col" className="px-4 py-2 text-left font-medium text-gray-600">Application</th>
            <th scope="col" className="px-4 py-2 text-left font-medium text-gray-600">Rôle</th>
            <th scope="col" className="px-4 py-2 text-left font-medium text-gray-600">Statut</th>
            <th scope="col" className="px-4 py-2 text-left font-medium text-gray-600">Créée le</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {requests.map((r) => (
            <tr key={r.id}>
              <td className="px-4 py-2 text-gray-900">{r.requesterName}</td>
              <td className="px-4 py-2 text-gray-700">{appName(r.applicationId)}</td>
              <td className="px-4 py-2 text-gray-700">{roleLabel(r.roleId)}</td>
              <td className="px-4 py-2"><StatusBadge status={r.status} /></td>
              <td className="px-4 py-2 text-gray-500">{formatDate(r.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
