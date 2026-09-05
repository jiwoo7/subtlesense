import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import PhoneFrame from "@/components/PhoneFrame";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@/components/ErrorBoundary";
import OfflineIndicator from "@/components/OfflineIndicator";
import OfflineGame from "@/components/OfflineGame";
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
const Tools = lazy(() => import("./pages/Tools"));

const Playlists = lazy(() => import("./pages/Playlists"));
const Methodology = lazy(() => import("./pages/Methodology"));
const Philosophy = lazy(() => import("./pages/Philosophy"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Guides = lazy(() => import("./pages/Guides"));
const GuideArticle = lazy(() => import("./pages/GuideArticle"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => <SubtleSenseLoader />;

const App = () => {
  useEffect(() => {
    try {
      const valid: ThemePreset[] = ["onyx", "heritage", "minimalist", "opulence", "estate", "carrara"];
      const stored = localStorage.getItem("subtlesense-theme-preset") as ThemePreset | null;
      applyThemePreset(stored && valid.includes(stored) ? stored : "onyx");
    } catch {}
  }, []);


  return (
  <ErrorBoundary>
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OfflineIndicator />
        <InstallPrompt />
        <BrowserRouter>
          <OfflineGame />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
  <Route path="/" element={<PhoneFrame><Landing /></PhoneFrame>} />
  <Route path="/demo" element={<PhoneFrame><Demo /></PhoneFrame>} />
  
  <Route path="/games" element={<PhoneFrame><Games /></PhoneFrame>} />
  <Route path="/tools" element={<PhoneFrame><Tools /></PhoneFrame>} />

  <Route path="/playlists" element={<PhoneFrame><Playlists /></PhoneFrame>} />
  <Route path="/methodology" element={<PhoneFrame><Methodology /></PhoneFrame>} />
  <Route path="/philosophy" element={<PhoneFrame><Philosophy /></PhoneFrame>} />
  <Route path="/guides" element={<PhoneFrame><Guides /></PhoneFrame>} />
  <Route path="/guides/:slug" element={<PhoneFrame><GuideArticle /></PhoneFrame>} />
  <Route path="/pricing" element={<PhoneFrame><Pricing /></PhoneFrame>} />
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
    </HelmetProvider>
  </ErrorBoundary>
  );
};

export default App;
