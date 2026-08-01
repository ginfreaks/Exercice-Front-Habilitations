import { AccessRequestDetail } from "@/features/access-requests/components/AccessRequestDetail";
import { AccessRequestsList } from "@/features/access-requests/components/AccessRequestsList";
import { Navigate, Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AccessRequestsList />} />
      <Route path="/requests/:id" element={<AccessRequestDetail />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
