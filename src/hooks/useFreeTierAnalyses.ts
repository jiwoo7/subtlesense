import { useState, useEffect } from 'react';

const FREE_TIER_LIMIT = 10;
const STORAGE_KEY = 'subtlesense_free_analyses';

interface FreeTierData {
  count: number;
  resetDate: string; // ISO date string for when limit resets monthly
}

export const useFreeTierAnalyses = (userId: string | undefined) => {
  const [analysesUsed, setAnalysesUsed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If user is logged in, they have unlimited analyses
    if (userId) {
      setAnalysesUsed(0);
      setIsLoading(false);
      return;
    }

    // For non-logged-in users, track local free analyses
    const loadAnalyses = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          setAnalysesUsed(0);
          setIsLoading(false);
          return;
        }

        const data: FreeTierData = JSON.parse(stored);
        const today = new Date().toDateString();
        const resetDate = new Date(data.resetDate).toDateString();

        // Reset if it's a new month
        if (today !== resetDate) {
          setAnalysesUsed(0);
          localStorage.removeItem(STORAGE_KEY);
        } else {
          setAnalysesUsed(data.count);
        }
      } catch (error) {
        console.error('Error loading free tier data:', error);
        setAnalysesUsed(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalyses();
  }, [userId]);

  const incrementAnalyses = () => {
    if (userId) return; // Logged-in users don't need to track

    setAnalysesUsed((prev) => {
      const newCount = Math.min(prev + 1, FREE_TIER_LIMIT);
      const data: FreeTierData = {
        count: newCount,
        resetDate: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return newCount;
    });
  };

  const canAnalyze = userId ? true : analysesUsed < FREE_TIER_LIMIT;
  const remainingAnalyses = FREE_TIER_LIMIT - analysesUsed;

  return {
    analysesUsed,
    remainingAnalyses,
    canAnalyze,
    isLoading,
    incrementAnalyses,
    FREE_TIER_LIMIT,
  };
};
