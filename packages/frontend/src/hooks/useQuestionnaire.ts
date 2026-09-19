import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Question {
  id: string;
  key: string;
  source: string | null;
  type: string;
  label: string;
  description: string | null;
  required: boolean;
  order: number;
  options: unknown;
  validation: unknown;
  dependsOn: { raw?: string } | null;
  complexityImpact: unknown;
  fteImpact: unknown;
  mandaysImpact: unknown;
  appliesTo: string[];
}

export interface Section {
  id: string;
  key: string;
  title: string;
  order: number;
  questions: Question[];
}

interface QuestionnaireResponse {
  success: boolean;
  data: {
    standards: string[];
    sections: Section[];
    total: number;
  };
}

export function useQuestionnaire(standards: string[]) {
  return useQuery({
    queryKey: ['questionnaire', standards.sort().join(',')],
    queryFn: async () => {
      const query = standards.join(',');
      const res = await api.get<QuestionnaireResponse>(
        `/questionnaire?standards=${query}`,
      );

      // Buang section common_section_* (borang permohonan)
      const filtered = res.data.sections.filter(
        (s) => !s.key.startsWith('common_section_'),
      );

      // Merge multi_standard ke section pertama
      const multi = filtered.filter((s) => s.key === 'multi_standard');
      const others = filtered.filter((s) => s.key !== 'multi_standard');

      if (multi.length > 0 && others.length > 0) {
        const multiQuestions = multi.flatMap((m) => m.questions);
        return others.map((s, idx) =>
          idx === 0
            ? { ...s, questions: [...s.questions, ...multiQuestions] }
            : s,
        );
      }

      // Kalau cuma multi_standard (takde section lain), rename
      if (others.length === 0 && multi.length > 0) {
        return multi.map((s) => ({ ...s, title: 'Additional Questions' }));
      }

      return others;
    },
    enabled: standards.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}
