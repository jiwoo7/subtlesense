import { AuthProvider } from "@/contexts/AuthContext";
import Auth from "./Auth";

const AuthWithProvider = () => (
  <AuthProvider>
    <Auth />
  </AuthProvider>
);

export default AuthWithProvider;