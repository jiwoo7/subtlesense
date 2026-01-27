export type UploadType = "webcam" | "audio" | "video" | null;

export interface AnalysisResult {
  // Surface Emotions
  happiness: number;
  sadness: number;
  anger: number;
  fear: number;
  surprise: number;
  disgust: number;
  // Hidden Emotions
  hiddenAnxiety: number;
  hiddenInsecurity: number;
  hiddenLoneliness: number;
  hiddenGuilt: number;
  // Suppressed Emotions
  suppressedAnger: number;
  suppressedSadness: number;
  suppressedFear: number;
  suppressedDesire: number;
  // Meta States
  emotionalMasking: number;
  innerConflict: number;
  // Analysis meta
  accuracy: number;
  suggestions: Array<{
    title: string;
    description: string;
    icon: string;
    variant: string;
  }>;
  advice: string;
  deepInsight: string;
  uploadType: UploadType;
}

export type EmotionColor = 
  | "happiness" | "sadness" | "anger" | "fear" | "surprise" | "disgust"
  | "hiddenAnxiety" | "hiddenInsecurity" | "hiddenLoneliness" | "hiddenGuilt"
  | "suppressedAnger" | "suppressedSadness" | "suppressedFear" | "suppressedDesire"
  | "emotionalMasking" | "innerConflict";

export interface EmotionData {
  label: string;
  value: number;
  color: EmotionColor;
  emoji: string;
  category: "surface" | "hidden" | "suppressed" | "meta";
}

export const SURFACE_EMOTIONS: Array<{ key: keyof AnalysisResult; label: string; color: EmotionColor; emoji: string }> = [
  { key: "happiness", label: "Happiness", color: "happiness", emoji: "😊" },
  { key: "sadness", label: "Sadness", color: "sadness", emoji: "😢" },
  { key: "anger", label: "Anger", color: "anger", emoji: "😠" },
  { key: "fear", label: "Fear", color: "fear", emoji: "😨" },
  { key: "surprise", label: "Surprise", color: "surprise", emoji: "😲" },
  { key: "disgust", label: "Disgust", color: "disgust", emoji: "🤢" },
];

export const HIDDEN_EMOTIONS: Array<{ key: keyof AnalysisResult; label: string; color: EmotionColor; emoji: string }> = [
  { key: "hiddenAnxiety", label: "Hidden Anxiety", color: "hiddenAnxiety", emoji: "😰" },
  { key: "hiddenInsecurity", label: "Hidden Insecurity", color: "hiddenInsecurity", emoji: "🫣" },
  { key: "hiddenLoneliness", label: "Hidden Loneliness", color: "hiddenLoneliness", emoji: "🥀" },
  { key: "hiddenGuilt", label: "Hidden Guilt", color: "hiddenGuilt", emoji: "😔" },
];

export const SUPPRESSED_EMOTIONS: Array<{ key: keyof AnalysisResult; label: string; color: EmotionColor; emoji: string }> = [
  { key: "suppressedAnger", label: "Suppressed Anger", color: "suppressedAnger", emoji: "🤐" },
  { key: "suppressedSadness", label: "Suppressed Sadness", color: "suppressedSadness", emoji: "😶" },
  { key: "suppressedFear", label: "Suppressed Fear", color: "suppressedFear", emoji: "😬" },
  { key: "suppressedDesire", label: "Suppressed Desire", color: "suppressedDesire", emoji: "💭" },
];

export const META_EMOTIONS: Array<{ key: keyof AnalysisResult; label: string; color: EmotionColor; emoji: string }> = [
  { key: "emotionalMasking", label: "Emotional Masking", color: "emotionalMasking", emoji: "🎭" },
  { key: "innerConflict", label: "Inner Conflict", color: "innerConflict", emoji: "⚔️" },
];
