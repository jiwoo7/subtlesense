import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import PhoneFrame from "@/components/PhoneFrame";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import OfflineIndicator from "@/components/OfflineIndicator";
import SubtleSenseLoader from "@/components/SubtleSenseLoader";
import InstallPrompt from "@/components/InstallPrompt";
import CompanionChat from "@/components/CompanionChat";
import { applyThemePreset, type ThemePreset } from "@/hooks/useThemePreset";

const Landing = lazy(() => import("./pages/Landing"));
const Auth = lazy(() => import("./pages/AuthWithProvider"));
const Dashboard = lazy(() => import("./pages/DashboardWithProvider"));
const Settings = lazy(() => import("./pages/SettingsWithProvider"));
const Demo = lazy(() => import("./pages/Demo"));

const Games = lazy(() => import("./pages/Games"));
const Playlists = lazy(() => import("./pages/Playlists"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => <SubtleSenseLoader />;

const App = () => {
  useEffect(() => {
    try {
      const stored = (localStorage.getItem("subtlesense-theme-preset") as ThemePreset) || "midnight";
      applyThemePreset(stored);
    } catch {}
  }, []);

  return (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OfflineIndicator />
        <InstallPrompt />
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
  <Route path="/" element={<PhoneFrame><Landing /></PhoneFrame>} />
  <Route path="/demo" element={<PhoneFrame><Demo /></PhoneFrame>} />
  
  <Route path="/games" element={<PhoneFrame><Games /></PhoneFrame>} />
  <Route path="/playlists" element={<PhoneFrame><Playlists /></PhoneFrame>} />
  <Route path="/auth" element={<PhoneFrame><Auth /></PhoneFrame>} />
  <Route path="/dashboard" element={<PhoneFrame><Dashboard /></PhoneFrame>} />
  <Route path="/settings" element={<PhoneFrame><Settings /></PhoneFrame>} />
  <Route path="*" element={<PhoneFrame><NotFound /></PhoneFrame>} />
</Routes>
          </Suspense>
          <CompanionChat />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
  );
};

export default App;
