import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Diamond, Eye, EyeOff, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import AnimatedBackground from "@/components/AnimatedBackground";
import logoUrl from "@/assets/subtle-sense-logo.png";

const ease = [0.25, 1, 0.5, 1] as const;

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (!formData.fullName.trim()) {
          toast.error("Please enter your name");
          setLoading(false);
          return;
        }
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Welcome to Subtle Sense.");
          navigate("/dashboard");
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Welcome back.");
          navigate("/dashboard");
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-x-hidden py-4 sm:min-h-screen sm:py-0">
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        <motion.button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground sm:mb-8"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-xs font-medium sm:text-sm">Back to home</span>
        </motion.button>

        <motion.div
          className="relative overflow-hidden border border-primary/25 bg-card/45 p-4 shadow-[0_0_80px_hsl(var(--primary)/0.08)] backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-0 h-full w-24 rotate-12 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
            animate={{ x: [0, -18, 0], opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="mb-5 flex flex-col items-center justify-center text-center sm:mb-8">
            <motion.div
              className="gold-ring relative mb-5 flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-3 rotate-45 border border-primary/50 bg-background/60"
                animate={{
                  rotate: [45, 50, 45],
                  boxShadow: [
                    "0 0 0 hsl(var(--primary) / 0)",
                    "0 0 32px hsl(var(--primary) / 0.18)",
                    "0 0 0 hsl(var(--primary) / 0)",
                  ],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src={logoUrl}
                alt="Subtle Sense"
                className="relative z-10 h-14 w-14 object-contain sm:h-16 sm:w-16"
                style={{ filter: "drop-shadow(0 0 18px hsl(var(--primary) / 0.35))" }}
              />
            </motion.div>
            <p className="eyebrow text-gold">Private Emotional Intelligence</p>
            <h1 className="editorial-heading mt-2 text-3xl uppercase tracking-[0.28em] text-foreground sm:text-4xl">
              Subtle Sense
            </h1>
            <p className="mt-3 max-w-xs text-xs font-light leading-relaxed text-muted-foreground">
              Enter the atelier where hidden emotion becomes a precise, private reading.
            </p>
          </div>

          <div className="mb-4 text-center sm:mb-8">
            <h2 className="editorial-heading mb-1 text-2xl sm:mb-2 sm:text-3xl">
              {isSignUp ? "Claim your private key" : "Return to your vault"}
            </h2>
            <p className="text-xs font-light text-muted-foreground sm:text-sm">
              {isSignUp
                ? "Create a refined space for your readings, journal, and mood history."
                : "Continue your quiet record of what lives beneath the surface."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-xs font-medium sm:text-sm">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="h-10 rounded-none border-border/70 bg-background/40 text-sm focus:border-primary/70 sm:h-12"
                  required={isSignUp}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium sm:text-sm">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-10 rounded-none border-border/70 bg-background/40 text-sm focus:border-primary/70 sm:h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium sm:text-sm">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-10 rounded-none border-border/70 bg-background/40 pr-12 text-sm focus:border-primary/70 sm:h-12"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground sm:right-4"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="group h-11 w-full rounded-none border border-primary bg-primary text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground transition-all duration-500 hover:tracking-[0.24em] sm:h-12"
            >
              {loading ? (
                <motion.div
                  className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  {isSignUp ? "Open the vault" : "Enter"}
                  {isSignUp ? (
                    <Diamond className="ml-2 h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                  ) : (
                    <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                  )}
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center sm:mt-6">
            <p className="text-xs text-muted-foreground sm:text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 border-b border-border pb-0.5 font-medium text-gold hover:border-primary"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
