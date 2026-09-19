import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AnswersMap = Record<string, unknown>;

interface QuestionnaireStore {
  answers: AnswersMap;
  currentSectionIndex: number;
  setAnswer: (key: string, value: unknown) => void;
  setSectionIndex: (index: number) => void;
  reset: () => void;
}

export const useQuestionnaireStore = create<QuestionnaireStore>()(
  persist(
    (set) => ({
      answers: {},
      currentSectionIndex: 0,
      setAnswer: (key, value) =>
        set((state) => ({ answers: { ...state.answers, [key]: value } })),
      setSectionIndex: (index) => set({ currentSectionIndex: index }),
      reset: () => set({ answers: {}, currentSectionIndex: 0 }),
    }),
    { name: 'scale-questionnaire-draft', version: 1 },
  ),
);
