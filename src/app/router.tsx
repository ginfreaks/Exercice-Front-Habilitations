import { AccessRequestsList } from "@/features/access-requests/components/AccessRequestsList";
import { Navigate, Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AccessRequestsList />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
