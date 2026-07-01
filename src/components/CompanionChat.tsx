import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/companion-chat`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const CompanionChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    const handler = (e: Event) => {
      setOpen(true);
      const detail = (e as CustomEvent<{ text?: string }>).detail;
      if (detail?.text) setInput(detail.text);
    };
    window.addEventListener("subtle:open-companion", handler as EventListener);
    return () => window.removeEventListener("subtle:open-companion", handler as EventListener);
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${ANON}` },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        setMessages((m) => [...m, { role: "assistant", content: err.error || "Sorry, something hiccuped. Try again?" }]);
        setBusy(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assembled = "";
      let started = false;

      const flush = (chunk: string) => {
        assembled += chunk;
        setMessages((m) => {
          if (!started) {
            started = true;
            return [...m, { role: "assistant", content: assembled }];
          }
          return m.map((msg, i) => (i === m.length - 1 ? { ...msg, content: assembled } : msg));
        });
      };

      let done = false;
      while (!done) {
        const r = await reader.read();
        if (r.done) break;
        buffer += decoder.decode(r.value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const p = JSON.parse(json);
            const c = p.choices?.[0]?.delta?.content;
            if (c) flush(c);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "I couldn't reach the network. Mind trying again?" }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-x-3 bottom-20 sm:inset-x-auto sm:bottom-24 sm:right-6 z-[60] w-auto sm:w-96 sm:max-w-[26rem] h-[calc(100dvh-6rem)] max-h-[28rem] sm:h-[32rem] sm:max-h-none glass-panel rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-border/60"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40 neon-gradient">
              <img src={logo} alt="" className="w-8 h-8 rounded-full bg-background/20 p-1" />
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-primary-foreground text-sm leading-tight">Subtle Companion</p>
                <p className="text-[10px] text-primary-foreground/80 italic">Your subtle companion ✨</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/90 hover:text-primary-foreground" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <img src={logo} alt="" className="w-14 h-14 mx-auto mb-3 opacity-90" />
                  <p className="text-sm font-display font-bold gradient-text mb-1">Hi, I'm here.</p>
                  <p className="text-xs text-muted-foreground max-w-[14rem] mx-auto">
                    Tell me how you're feeling, or ask anything. No pressure.
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                      m.role === "user" ? "neon-gradient text-primary-foreground" : "bg-muted/60 text-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {busy && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-muted/60 rounded-2xl px-3 py-2 text-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "120ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "240ms" }} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="p-2.5 sm:p-3 border-t border-border/40 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share what's on your mind…"
                className="flex-1 bg-muted/40 border border-border/40 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={busy}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="w-10 h-10 rounded-full neon-gradient flex items-center justify-center disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="hidden sm:flex fixed bottom-8 right-8 z-[60] group items-center justify-center"
        aria-label="Open companion"
      >
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap eyebrow opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          Companion
        </span>
        <div
          className="w-12 h-12 border border-border bg-transparent flex items-center justify-center transition-colors duration-500 group-hover:border-primary"
          style={{ borderRadius: "2px" }}
        >
          {open ? (
            <X className="w-4 h-4 text-foreground" strokeWidth={1.25} />
          ) : (
            <MessageCircle className="w-4 h-4 text-foreground" strokeWidth={1.25} />
          )}
        </div>
      </button>

    </>
  );
};

export default CompanionChat;
