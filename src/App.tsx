import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import OfflineIndicator from "@/components/OfflineIndicator";
import SubtleSenseLoader from "@/components/SubtleSenseLoader";
import InstallPrompt from "@/components/InstallPrompt";
import { applyThemePreset, type ThemePreset } from "@/hooks/useThemePreset";

const Landing = lazy(() => import("./pages/Landing"));
const Auth = lazy(() => import("./pages/AuthWithProvider"));
const Dashboard = lazy(() => import("./pages/DashboardWithProvider"));
const Settings = lazy(() => import("./pages/SettingsWithProvider"));
const Demo = lazy(() => import("./pages/Demo"));
const Premium = lazy(() => import("./pages/Premium"));
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
              <Route path="/" element={<Landing />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
