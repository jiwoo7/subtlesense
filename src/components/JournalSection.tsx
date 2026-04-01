import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Trash2, Edit3, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";

interface JournalEntry {
  id: string;
  content: string;
  mood_tag: string | null;
  created_at: string;
  session_id: string | null;
}

const MOOD_TAGS = ["😊 Happy", "😔 Sad", "😤 Frustrated", "😌 Calm", "🤔 Reflective", "💪 Motivated", "😰 Anxious"];

const JournalSection = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (user) fetchEntries();
  }, [user]);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setEntries((data as JournalEntry[]) || []);
    } catch (e) {
      console.error("Failed to fetch journal:", e);
      toast.error("Failed to load journal");
    } finally {
      setLoading(false);
    }
  };

  const saveEntry = async () => {
    if (!newContent.trim() || !user) return;
    try {
      const { data, error } = await supabase
        .from("journal_entries")
        .insert({
          user_id: user.id,
          content: newContent.trim(),
          mood_tag: selectedMood,
        })
        .select()
        .single();

      if (error) throw error;
      setEntries([(data as JournalEntry), ...entries]);
      setNewContent("");
      setSelectedMood(null);
      setShowNew(false);
      toast.success("Journal entry saved! 📝");
    } catch (e) {
      console.error("Failed to save:", e);
      toast.error("Failed to save entry");
    }
  };

  const updateEntry = async (id: string) => {
    if (!editContent.trim()) return;
    try {
      const { error } = await supabase
        .from("journal_entries")
        .update({ content: editContent.trim() })
        .eq("id", id);

      if (error) throw error;
      setEntries(entries.map((e) => (e.id === id ? { ...e, content: editContent.trim() } : e)));
      setEditingId(null);
      toast.success("Entry updated!");
    } catch (e) {
      console.error("Failed to update:", e);
      toast.error("Failed to update");
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from("journal_entries")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setEntries(entries.filter((e) => e.id !== id));
      toast.success("Entry deleted");
    } catch (e) {
      console.error("Failed to delete:", e);
      toast.error("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="mt-8 flex items-center justify-center py-20">
        <motion.div
          className="w-12 h-12 rounded-full border-3 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="font-display text-2xl font-bold">My Journal 📝</h2>
        </div>
        <Button
          onClick={() => setShowNew(!showNew)}
          size="sm"
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Entry
        </Button>
      </div>

      <AnimatePresence>
        {showNew && (
          <motion.div
            className="glass-panel rounded-2xl p-4 sm:p-6 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Textarea
              placeholder="How are you feeling? Reflect on your emotions..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="mb-3 bg-muted/50 border-border min-h-[100px]"
            />
            
            <div className="flex flex-wrap gap-2 mb-4">
              {MOOD_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedMood(selectedMood === tag ? null : tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedMood === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={saveEntry} size="sm" disabled={!newContent.trim()}>
                <Save className="w-4 h-4 mr-1" /> Save
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowNew(false)}>
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {entries.length === 0 ? (
        <motion.div
          className="glass-panel rounded-3xl p-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold mb-2">No Journal Entries Yet</h3>
          <p className="text-muted-foreground">
            Start journaling to combine AI insights with personal reflection! ✍️
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              className="glass-panel rounded-2xl p-4 sm:p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(entry.created_at), "MMM d, yyyy 'at' h:mm a")}
                    </span>
                    {entry.mood_tag && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary/20 text-primary font-medium">
                        {entry.mood_tag}
                      </span>
                    )}
                  </div>

                  {editingId === entry.id ? (
                    <div>
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="mb-2 bg-muted/50 border-border"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => updateEntry(entry.id)}>
                          Save
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-foreground whitespace-pre-wrap">{entry.content}</p>
                  )}
                </div>

                <div className="flex gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      setEditingId(entry.id);
                      setEditContent(entry.content);
                    }}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => deleteEntry(entry.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default JournalSection;
