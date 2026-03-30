import { AuthProvider } from "@/contexts/AuthContext";
import Dashboard from "./Dashboard";

const DashboardWithProvider = () => (
  <AuthProvider>
    <Dashboard />
  </AuthProvider>
);

export default DashboardWithProvider;