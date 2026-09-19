import { useNavigate } from 'react-router-dom';
import { useApplicationStore } from '@/lib/applicationStore';
import { useQuestionnaireStore } from '@/lib/questionnaireStore';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import { SectionWizard } from '@/components/questionnaire/SectionWizard';

export function AnswersPage() {
  const navigate = useNavigate();
  const standards = useApplicationStore((s) => s.data.standards);
  const answers = useQuestionnaireStore((s) => s.answers);
  const resetQuestionnaire = useQuestionnaireStore((s) => s.reset);
  const resetApplication = useApplicationStore((s) => s.reset);

  const { data: sections, isLoading, isError } = useQuestionnaire(standards);

  const handleComplete = () => {
    // TODO Fasa 8.6: hantar ke POST /api/calculations
    console.log('Questionnaire answers:', answers);
    alert('Submit questionnaire — akan diimplement dalam Fasa 8.6');

    // Reset semua state — elak data lama muncul bila New Application
    resetQuestionnaire();
    resetApplication();

    navigate('/');
  };

  if (standards.length === 0) {
    return (
      <div className="max-w-3xl">
        <div className="bg-amber-50 border border-amber-200 rounded p-6 text-center">
          <p className="text-amber-800 font-medium mb-2">
            No standards selected
          </p>
          <p className="text-sm text-amber-700 mb-4">
            Please complete the application form first.
          </p>
          <button
            onClick={() => navigate('/questionnaire/new')}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Application Form
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl">
        <p className="text-gray-500">Loading questionnaire...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-3xl">
        <div className="bg-red-50 border border-red-200 rounded p-6">
          <p className="text-red-800 font-medium mb-2">
            Failed to load questionnaire
          </p>
          <p className="text-sm text-red-700">
            Please refresh the page or contact support.
          </p>
        </div>
      </div>
    );
  }

  if (!sections || sections.length === 0) {
    return (
      <div className="max-w-3xl">
        <div className="bg-amber-50 border border-amber-200 rounded p-6 text-center">
          <p className="text-amber-800 font-medium mb-2">No questions found</p>
          <p className="text-sm text-amber-700">
            Selected standards: {standards.join(', ')}
          </p>
        </div>
      </div>
    );
  }

  return <SectionWizard sections={sections} onComplete={handleComplete} />;
}
