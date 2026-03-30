import { AuthProvider } from "@/contexts/AuthContext";
import Settings from "./Settings";

const SettingsWithProvider = () => (
  <AuthProvider>
    <Settings />
  </AuthProvider>
);

export default SettingsWithProvider;