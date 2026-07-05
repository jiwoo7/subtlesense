import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier?: string;
}

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
        body: { email: clean, name: name.trim(), tier },
      });
      if (error) throw error;
      setDone({ position: (data as any)?.position, alreadyJoined: (data as any)?.alreadyJoined });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = (o: boolean) => {
    onOpenChange(o);
    if (!o) {
      setTimeout(() => { setDone(null); setEmail(""); setName(""); }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent className="sm:max-w-md">
        {!done ? (
          <>
            <DialogHeader>
              <DialogTitle className="editorial-heading text-2xl">
                Reserve your place{tier ? <> · <span className="editorial-italic text-gold">{tier}</span></> : null}
              </DialogTitle>
              <DialogDescription className="font-light leading-relaxed">
                Leave your email. We'll write only when the practice opens — no marketing, no lists.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="space-y-3 pt-2">
              <Input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <button type="submit" disabled={loading} className="btn-editorial w-full">
                {loading ? "Sending…" : "Reserve place"}
              </button>
              <p className="eyebrow text-muted-foreground text-center pt-1">
                Founding Members receive 50% off for life
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <p className="eyebrow text-gold mb-4">
              {done.alreadyJoined ? "Already on the list" : "You're in"}
            </p>
            <h3 className="editorial-heading text-2xl mb-3">
              {done.alreadyJoined ? "We already have you." : "Thank you."}
            </h3>
            <p className="font-light text-muted-foreground leading-relaxed max-w-sm mx-auto">
              {done.position ? <>You are <span className="text-gold">#{done.position}</span> in line. </> : null}
              We'll write the moment Interior opens.
            </p>
            <button onClick={() => reset(false)} className="btn-editorial-ghost mt-6">
              Close
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistDialog;
