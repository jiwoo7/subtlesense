// AI-powered emotional context recommendations for SubtleSense

export interface EmotionalContext {
  emotion: string;
  triggers: string[];
  symptoms: string[];
  recommendations: string[];
  subtleSenseValue: string;
}

export const emotionalContexts: Record<string, EmotionalContext> = {
  anxiety: {
    emotion: "Anxiety",
    triggers: ["uncertainty", "anticipation", "pressure", "social situations"],
    symptoms: [
      "Racing thoughts",
      "Physical tension",
      "Difficulty concentrating",
      "Sleep disruption",
      "Constant worry"
    ],
    recommendations: [
      "Use Subtle Sense to capture what your face and voice reveal when anxious",
      "Track the gap between what you say ('I'm fine') and what your body shows",
      "60-second readings help you see anxiety patterns others might miss",
      "Use insights to understand your anxiety's true cost"
    ],
    subtleSenseValue:
      "Most people don't realize how visible anxiety is until they see themselves. Subtle Sense makes that visible, turning vague worry into concrete patterns you can address."
  },
  numbness: {
    emotion: "Emotional Numbness",
    triggers: ["burnout", "grief", "depression", "chronic stress", "dissociation"],
    symptoms: [
      "Good news lands flat",
      "Watching yourself from outside",
      "Seeking intensity to feel anything",
      "Seeming unusually calm",
      "Unable to cry",
      "Time blurs together"
    ],
    recommendations: [
      "Numbness is invisible to others — and often to yourself",
      "Subtle Sense captures emotional states you can't feel",
      "60-second readings show presence beneath the flatness",
      "Evidence of feeling (when you can't feel) restarts contact with yourself"
    ],
    subtleSenseValue:
      "When nothing feels real, Subtle Sense becomes your mirror. It shows you proof of emotion your mind has hidden — the first step toward reconnection."
  },
  burnout: {
    emotion: "Emotional Burnout",
    triggers: [
      "overwork",
      "lack of autonomy",
      "unclear expectations",
      "emotional labor",
      "unsustainable pace"
    ],
    symptoms: [
      "Requests feel disproportionately heavy",
      "Loss of opinions and passion",
      "Sunday dread",
      "People reduced to categories",
      "Recovery takes longer",
      "Fantasies of escape"
    ],
    recommendations: [
      "Burnout hides behind continued performance",
      "Subtle Sense tracks the gap widening between presentation and reality",
      "Weekly readings show depletion before collapse",
      "Visual evidence helps you name what's unsustainable"
    ],
    subtleSenseValue:
      "Burnout reveals itself in small hesitations, in tone changes, in the effort behind the smile. Subtle Sense catches these before they become crisis."
  },
  masking: {
    emotion: "Emotional Masking",
    triggers: ["social pressure", "performance contexts", "safety concerns", "relational dynamics"],
    symptoms: [
      "Smile at inappropriate moments",
      "Flat tone despite upbeat words",
      "Asymmetrical expressions",
      "Words don't match body",
      "Exhaustion after social contact"
    ],
    recommendations: [
      "Masking's cost shows up before you realize it",
      "Subtle Sense makes the gap between mask and reality visible",
      "Understand which contexts demand the most performance",
      "Track recovery time — a sign masking is becoming unsustainable"
    ],
    subtleSenseValue:
      "The mask itself isn't the problem — it's not knowing it's there. Subtle Sense makes it visible, so you can choose when to keep it and when to let it drop."
  },
  depression: {
    emotion: "Depression",
    triggers: ["loss", "isolation", "chronic stress", "trauma", "hormonal changes"],
    symptoms: [
      "Flatness rather than sadness",
      "Loss of interest",
      "Sleep changes",
      "Appetite shifts",
      "Difficulty concentrating",
      "Hopelessness"
    ],
    recommendations: [
      "Depression whispers before it speaks",
      "Subtle Sense captures early changes others might miss",
      "Track mood patterns through expressions and tone",
      "Evidence of feeling helps you communicate your struggle"
    ],
    subtleSenseValue:
      "When depression isolates you in silence, Subtle Sense gives you language. It shows you proof of what you're experiencing, making the invisible real."
  },
  suppression: {
    emotion: "Emotional Suppression",
    triggers: [
      "unsafe environments",
      "learned patterns",
      "high-stakes situations",
      "relationship dynamics"
    ],
    symptoms: [
      "Answering 'fine' too quickly",
      "Physical tension",
      "Rehearsing conversations",
      "Difficulty making low-stakes decisions",
      "Numbness to good news"
    ],
    recommendations: [
      "Suppressed emotion works underground, outside awareness",
      "Subtle Sense shows you what you're holding back",
      "60-second readings reveal held tension in your face and voice",
      "Naming suppression is the first step to addressing it"
    ],
    subtleSenseValue:
      "Suppression learned as safety becomes a cage. Subtle Sense helps you see what you're protecting, so you can choose when to let it show."
  },
  grief: {
    emotion: "Grief",
    triggers: ["loss", "change", "nostalgia", "anniversaries", "reminder"],
    symptoms: [
      "Waves of sadness",
      "Numbness",
      "Difficulty concentrating",
      "Physical pain",
      "Loss of meaning",
      "Isolation"
    ],
    recommendations: [
      "Grief is often invisible — others expect you to 'move on'",
      "Subtle Sense validates what you're actually feeling",
      "Readings show presence of grief beneath the surface",
      "Track how grief changes over time"
    ],
    subtleSenseValue:
      "Grief doesn't need fixing — it needs witnessing. Subtle Sense becomes your witness when others can't see the weight you're carrying."
  },
  highfunctioninganxiety: {
    emotion: "High-Functioning Anxiety",
    triggers: [
      "achievement pressure",
      "perfectionism",
      "uncertainty",
      "visibility",
      "evaluation"
    ],
    symptoms: [
      "Always early",
      "Extensive rehearsal",
      "Difficulty accepting compliments",
      "Productivity as control",
      "Never fully settled",
      "Quick yes, quiet resentment"
    ],
    recommendations: [
      "High-functioning anxiety hides behind competence",
      "Subtle Sense reveals the effort behind the performance",
      "Track anxiety patterns in low-stakes and high-stakes situations",
      "See the cost of achievement before collapse"
    ],
    subtleSenseValue:
      "Others see success; you feel constant pressure. Subtle Sense shows the gap between your performance and your actual state — validating how hard you're working."
  }
};

export function getEmotionalContext(keyword: string): EmotionalContext | null {
  const normalized = keyword.toLowerCase().replace(/\s+/g, "");
  for (const [key, context] of Object.entries(emotionalContexts)) {
    if (
      key.includes(normalized) ||
      normalized.includes(key) ||
      context.emotion.toLowerCase().includes(keyword.toLowerCase()) ||
      context.triggers.some((t) => t.toLowerCase().includes(keyword.toLowerCase())) ||
      context.symptoms.some((s) => s.toLowerCase().includes(keyword.toLowerCase()))
    ) {
      return context;
    }
  }
  return null;
}

export function getRelatedGuides(emotion: string): string[] {
  const guides: Record<string, string[]> = {
    anxiety: [
      "high-functioning-anxiety",
      "how-to-name-your-feelings",
      "emotion-journaling-prompts"
    ],
    numbness: [
      "emotional-numbness",
      "emotional-burnout-signs",
      "how-to-name-your-feelings"
    ],
    burnout: [
      "emotional-burnout-signs",
      "emotional-numbness",
      "how-to-support-someone-who-wont-talk"
    ],
    masking: [
      "signs-of-masked-emotions",
      "emotional-burnout-signs",
      "how-to-name-your-feelings"
    ],
    depression: [
      "emotional-numbness",
      "emotional-burnout-signs",
      "how-to-name-your-feelings"
    ],
    suppression: [
      "signs-you-are-suppressing-emotions",
      "how-to-name-your-feelings",
      "emotion-journaling-prompts"
    ],
    grief: [
      "emotion-journaling-prompts",
      "how-to-name-your-feelings",
      "emotional-numbness"
    ],
    highfunctioninganxiety: [
      "high-functioning-anxiety",
      "emotional-burnout-signs",
      "signs-you-are-suppressing-emotions"
    ]
  };
  return guides[emotion.toLowerCase().replace(/\s+/g, "")] || [];
}
