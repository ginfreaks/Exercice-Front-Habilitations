import { AccessRequestStatus } from "../types/types";

type Tone = "gray" | "amber" | "green" | "red";

const toneClasses: Record<Tone, string> = {
  gray: "bg-gray-100 text-gray-700",
  amber: "bg-amber-100 text-amber-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
};

const statusConfig: Record<
  AccessRequestStatus,
  { label: string; tone: "amber" | "green" | "red" }
> = {
  PENDING: { label: "En attente", tone: "amber" },
  APPROVED: { label: "Approuvée", tone: "green" },
  REJECTED: { label: "Rejectée", tone: "red" },
};

export function StatusBadge({ status }: { status: AccessRequestStatus }) {
  const { label, tone } = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium  ...${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
