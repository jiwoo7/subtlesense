import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Compass, LayoutGrid, User as UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import logoUrl from "@/assets/subtle-sense-logo.png";

const tabs = [
  { icon: Home, label: "Home" },
  { icon: Compass, label: "Insights" },
  { icon: null, label: "Companion" },
  { icon: LayoutGrid, label: "Tools" },
  { icon: UserIcon, label: "Profile" },
] as const;

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setCurrentUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Hide on /auth so login form has full height
  if (location.pathname.startsWith("/auth")) return null;

  const openCompanion = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("subtle:open-companion"));
      }, 250);
    } else {
      window.dispatchEvent(new CustomEvent("subtle:open-companion"));
    }
  };

  const activeTab = (() => {
    const p = location.pathname;
    if (p.startsWith("/dashboard")) return "Insights";
    if (p.startsWith("/settings")) return "Profile";
    if (p.startsWith("/games") || p.startsWith("/playlists")) return "Tools";
    return "Home";
  })();

  const handleTab = (label: string) => {
    if (label === "Home") {
      if (location.pathname !== "/") navigate("/");
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "Insights") navigate("/dashboard");
    else if (label === "Companion") openCompanion();
    else if (label === "Tools") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => document.getElementById("mobile-tools")?.scrollIntoView({ behavior: "smooth" }), 200);
      } else {
        document.getElementById("mobile-tools")?.scrollIntoView({ behavior: "smooth" });
      }
    } else if (label === "Profile") navigate(currentUser ? "/settings" : "/auth");
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <div className="mx-auto mb-3 w-[calc(100%-1rem)] max-w-[414px] rounded-3xl bg-background/90 backdrop-blur-xl border border-border/50 shadow-2xl pointer-events-auto">
        <div className="flex items-center justify-around py-1.5">
          {tabs.map((t) => {
            const active = activeTab === t.label;
            return (
              <button
                key={t.label}
                onClick={() => handleTab(t.label)}
                aria-label={t.label}
                aria-current={active ? "page" : undefined}
                className={`flex min-w-[56px] flex-col items-center gap-0.5 px-1 py-1.5 rounded-xl transition-colors ${
                  active ? "text-neon-pink" : "text-muted-foreground"
                }`}
              >
                {t.icon ? (
                  <t.icon className="w-4 h-4" />
                ) : (
                  <img
                    src={logoUrl}
                    alt=""
                    className={`w-4 h-4 rounded-full object-cover ${active ? "" : "opacity-70"}`}
                  />
                )}
                <span className="text-[11px] font-medium leading-none">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
