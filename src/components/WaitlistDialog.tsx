import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier?: string;
}

const ease = [0.25, 1, 0.5, 1] as const;

type FieldProps = { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>;

const Field = forwardRef<HTMLInputElement, FieldProps>(({ id, label, ...rest }, ref) => (
  <div className="relative">
    <input
      id={id}
      ref={ref}
      {...rest}
      placeholder=" "
      className="peer w-full bg-transparent border-0 border-b border-border/70 px-0 pt-6 pb-2 text-base font-light text-foreground outline-none transition-colors duration-500 focus:border-gold placeholder:text-transparent"
    />
    <label
      htmlFor={id}
      className="pointer-events-none absolute left-0 top-6 origin-left text-sm font-light text-muted-foreground transition-all duration-500 peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:tracking-[0.22em] peer-focus:uppercase peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:tracking-[0.22em] peer-[:not(:placeholder-shown)]:uppercase"
    >
      {label}
    </label>
  </div>
));
Field.displayName = "Field";

const WaitlistDialog = ({ open, onOpenChange, tier }: Props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | { position?: number; alreadyJoined?: boolean }>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("join-waitlist", {
        body: { email: clean, name: name.trim().slice(0, 80), tier },
      });
      if (error) throw error;
      setDone({ position: (data as any)?.position, alreadyJoined: (data as any)?.alreadyJoined });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = (o: boolean) => {
    onOpenChange(o);
    if (!o) setTimeout(() => { setDone(null); setEmail(""); setName(""); }, 320);
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent className="sm:max-w-[30rem] rounded-none border-border/70 bg-background/95 backdrop-blur-xl p-0 overflow-hidden">
        {/* gold hairline crown */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

        <div className="px-7 sm:px-10 py-9">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease }}
              >
                {/* seal */}
                <div className="flex justify-center mb-7">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-gold/40" />
                    <span className="absolute inset-[6px] rounded-full border border-gold/20" />
                    <span className="editorial-heading text-gold text-sm tracking-[0.14em]">SS</span>
                  </div>
                </div>

                <p className="eyebrow text-center text-muted-foreground mb-4">
                  {tier ? <>Reserving · <span className="text-gold">{tier}</span></> : "Founding Member"}
                </p>

                <DialogTitle asChild>
                  <h2 className="editorial-heading text-[1.9rem] sm:text-[2.3rem] leading-[1.1] text-center mb-4">
                    Leave your name <br />
                    <span className="editorial-italic text-gold">at the door.</span>
                  </h2>
                </DialogTitle>

                <DialogDescription asChild>
                  <p className="text-center text-sm font-light text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    One letter, only when the practice opens. No marketing, no lists,
                    nothing to pay today.
                  </p>
                </DialogDescription>

                <div className="gold-hairline my-8" />

                <form onSubmit={submit} className="space-y-6">
                  <Field
                    id="wl-name"
                    label="Your name (optional)"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    maxLength={80}
                  />
                  <Field
                    id="wl-email"
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    maxLength={255}
                  />

                  <button type="submit" disabled={loading} className="btn-editorial w-full mt-2 disabled:opacity-60">
                    {loading ? "Sending…" : "Reserve my place"}
                  </button>

                  <p className="eyebrow text-center text-muted-foreground/80">
                    Founding Members keep 50% off, for life
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="text-center py-4"
              >
                <div className="flex justify-center mb-7">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.9, ease, delay: 0.1 }}
                    className="relative w-14 h-14 flex items-center justify-center"
                  >
                    <span className="absolute inset-0 rounded-full border border-gold/50 animate-shimmer" />
                    <span className="absolute inset-[7px] rounded-full border border-gold/25" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </motion.div>
                </div>

                <p className="eyebrow text-gold mb-4">
                  {done.alreadyJoined ? "Already on the list" : "Your place is held"}
                </p>

                <DialogTitle asChild>
                  <h3 className="editorial-heading text-[1.9rem] sm:text-[2.3rem] leading-[1.1] mb-5">
                    {done.alreadyJoined ? (
                      <>We already <span className="editorial-italic text-gold">have you.</span></>
                    ) : (
                      <>Thank you, <span className="editorial-italic text-gold">quietly.</span></>
                    )}
                  </h3>
                </DialogTitle>

                {done.position ? (
                  <div className="my-7">
                    <div className="gold-hairline mb-5" />
                    <p className="eyebrow text-muted-foreground mb-1">Your number</p>
                    <p className="editorial-heading text-5xl text-gold">#{done.position}</p>
                    <div className="gold-hairline mt-5" />
                  </div>
                ) : null}

                <DialogDescription asChild>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    We'll write the moment {tier ?? "the practice"} opens. Until then, the
                    reading room stays open to you.
                  </p>
                </DialogDescription>

                <button onClick={() => reset(false)} className="btn-editorial-ghost mt-8">
                  Close gently
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistDialog;
