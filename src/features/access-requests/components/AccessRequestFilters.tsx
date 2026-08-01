import { useSearchParams } from "react-router-dom";
import { AccessRequestStatus } from "../types/types";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const STATUS_OPTIONS: { value: AccessRequestStatus | ""; label: string }[] = [
  { value: "", label: "Tous les status" },
  { value: "PENDING", label: "En attente" },
  { value: "APPROVED", label: "Approuvée" },
  { value: "REJECTED", label: "Rejetée" },
];

export function AccessRequestFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") ?? "";

  const [queryInput, setQueryInput] = useState(() => searchParams.get("q")?? "");
  const debouncedQ = useDebouncedValue(queryInput, 200);

  useEffect(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (debouncedQ) next.set("q", debouncedQ);
        else next.delete("q");
        return next;
      },
      {
        replace: true,
      },
    );
  }, [debouncedQ,setSearchParams]);

 
  function handleStatusChange(value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set("status", value);
        else next.delete("status");
        return next;
      },
      { replace: true },
    );
  }

  return (
    <div className="mb-4 flex flex-wrap items-end gap-3">
      <div>
        <label
          htmlFor="status-filter"
          className="mb-1 block text-xs font-medium text-gray-600"
        >
          Statut
        </label>
        <select
          id="status-filter"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="min-w-55 flex-1">
        <label
          htmlFor="search-filter"
          className="mb-1 block text-xs font-medium text-gray-600"
        >
          Rechercher un demandeur
        </label>
        <input
          id="search-filter"
          type="text"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          placeholder="Nom du demandeur..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}
