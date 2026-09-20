import { useQuestionnaireStore } from '@/lib/questionnaireStore';
import type { Section } from '@/hooks/useQuestionnaire';
import { QuestionRenderer } from './QuestionRenderer';

interface Props {
  sections: Section[];
  onComplete: () => void;
}

export function SectionWizard({ sections, onComplete }: Props) {
  const currentIndex = useQuestionnaireStore((s) => s.currentSectionIndex);
  const setSectionIndex = useQuestionnaireStore((s) => s.setSectionIndex);
  const answers = useQuestionnaireStore((s) => s.answers);

  const section = sections[currentIndex];
  if (!section) return null;

  const isLast = currentIndex === sections.length - 1;

  const validate = (): string | null => {
    for (const q of section.questions) {
      if (!q.required) continue;

      // Skip kalau dependsOn tak dipenuhi (soalan tersembunyi)
      if (q.dependsOn?.raw) {
        const match = q.dependsOn.raw.match(/(Q\d+)\s*=\s*(Yes|No)/i);
        if (match) {
          const [, sourceQ, expected] = match;
          const sourceQuestion = section.questions.find((sq) =>
            sq.source?.includes(sourceQ),
          );
          if (sourceQuestion) {
            const sourceValue = answers[sourceQuestion.key];
            const expectedBool = expected.toLowerCase() === 'yes';
            if (sourceValue !== expectedBool) {
              continue; // Skip soalan tersembunyi
            }
          }
        }
      }

      const val = answers[q.key];
      if (val === undefined || val === null || val === '') {
        return `"${q.label}" is required`;
      }
    }
    return null;
  };

  const handleNext = () => {
    const err = validate();
    if (err) {
      alert(err);
      return;
    }
    if (isLast) {
      onComplete();
    } else {
      setSectionIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setSectionIndex(currentIndex - 1);
  };

  return (
    <div className="max-w-3xl">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Questionnaire</h1>
          <span className="text-sm text-gray-500">
            Section {currentIndex + 1} of {sections.length}
          </span>
        </div>
        <div className="flex gap-1">
          {sections.map((s, idx) => (
            <div
              key={s.id}
              className={`h-1 flex-1 rounded ${
                idx < currentIndex
                  ? 'bg-green-500'
                  : idx === currentIndex
                  ? 'bg-blue-600'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Section content */}
      <div className="bg-white rounded-lg shadow p-6 mb-6 space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {section.title}
          </h2>
          <span className="text-xs text-gray-500">
            {section.questions.length} questions
          </span>
        </div>
        {section.questions.map((q, idx) => (
          <div key={q.id} className="space-y-2">
            <span className="text-xs text-gray-400">
              Q{idx + 1} of {section.questions.length}
            </span>
            <QuestionRenderer question={q} allQuestions={section.questions} />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isLast ? 'Submit' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
