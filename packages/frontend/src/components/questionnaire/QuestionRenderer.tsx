import { useQuestionnaireStore } from '@/lib/questionnaireStore';
import type { Question } from '@/hooks/useQuestionnaire';

interface Props {
  question: Question;
}

export function QuestionRenderer({ question }: Props) {
  const answers = useQuestionnaireStore((s) => s.answers);
  const setAnswer = useQuestionnaireStore((s) => s.setAnswer);
  const value = answers[question.key];

  const handleChange = (v: unknown) => setAnswer(question.key, v);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {question.label}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {question.description && (
        <p className="text-xs text-gray-500">{question.description}</p>
      )}

      {question.type === 'text' && (
        <input
          type="text"
          value={(value as string) ?? ''}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {question.type === 'textarea' && (
        <textarea
          value={(value as string) ?? ''}
          onChange={(e) => handleChange(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {question.type === 'number' && (
        <input
          type="number"
          value={(value as number) ?? ''}
          onChange={(e) => handleChange(Number(e.target.value) || 0)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {question.type === 'boolean' && (
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name={question.key}
              checked={value === true}
              onChange={() => handleChange(true)}
              className="text-blue-600 focus:ring-blue-500"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name={question.key}
              checked={value === false}
              onChange={() => handleChange(false)}
              className="text-blue-600 focus:ring-blue-500"
            />
            No
          </label>
        </div>
      )}

      {question.type === 'select' && (
        <select
          value={(value as string) ?? ''}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select --</option>
          {Array.isArray(question.options) &&
            (question.options as Array<{ value: string; label: string }>).map(
              (opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ),
            )}
        </select>
      )}

      {(question.type === 'radio' || question.type === 'multiselect') && (
        <div className="space-y-1">
          {Array.isArray(question.options) &&
            (question.options as Array<{ value: string; label: string }>).map(
              (opt) => (
                <label
                  key={opt.value}
                  className="flex items-start gap-2 text-sm cursor-pointer"
                >
                  <input
                    type={question.type === 'radio' ? 'radio' : 'checkbox'}
                    name={question.key}
                    checked={
                      question.type === 'radio'
                        ? value === opt.value
                        : Array.isArray(value) && (value as string[]).includes(opt.value)
                    }
                    onChange={() => {
                      if (question.type === 'radio') {
                        handleChange(opt.value);
                      } else {
                        const arr = Array.isArray(value) ? (value as string[]) : [];
                        handleChange(
                          arr.includes(opt.value)
                            ? arr.filter((v) => v !== opt.value)
                            : [...arr, opt.value],
                        );
                      }
                    }}
                    className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{opt.label}</span>
                </label>
              ),
            )}
        </div>
      )}

      {!['text', 'textarea', 'number', 'boolean', 'select', 'radio', 'multiselect'].includes(
        question.type,
      ) && (
        <p className="text-xs text-amber-600">
          Unsupported type: {question.type}
        </p>
      )}
    </div>
  );
}
