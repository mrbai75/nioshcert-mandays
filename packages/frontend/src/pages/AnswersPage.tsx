import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationStore } from '@/lib/applicationStore';
import { useQuestionnaireStore } from '@/lib/questionnaireStore';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import { SectionWizard } from '@/components/questionnaire/SectionWizard';
import { api, ApiClientError } from '@/lib/api';

export function AnswersPage() {
  const navigate = useNavigate();
  const standards = useApplicationStore((s) => s.data.standards);
  const applicationData = useApplicationStore((s) => s.data);
  const answers = useQuestionnaireStore((s) => s.answers);
  const resetQuestionnaire = useQuestionnaireStore((s) => s.reset);
  const resetApplication = useApplicationStore((s) => s.reset);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: sections, isLoading, isError } = useQuestionnaire(standards);

  const handleComplete = async () => {
    // Validate employees dulu (elak FTE = 0)
    const emp = applicationData.employees;
    const totalEmployees =
      (emp.management ?? 0) +
      (emp.permanent ?? 0) +
      (emp.contract ?? 0) +
      (emp.repetitive ?? 0);

    if (totalEmployees === 0) {
      setSubmitError(
        'Sila isi maklumat pekerja (Step 3: Number of Employees) terlebih dahulu.',
      );
      return;
    }

    // Validate company name
    if (!applicationData.company.name || applicationData.company.name.trim() === '') {
      setSubmitError(
        'Sila isi nama syarikat (Step 1: Company Information) terlebih dahulu.',
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Hantar ke backend
      const response = await api.calculateMandays({
        standards,
        answers,
        applicationType: 'NEW',
        application: {
          company: {
            name: applicationData.company.name,
            address: applicationData.company.address,
            legalStatus: applicationData.company.legalStatus,
            orgType: applicationData.company.orgType,
            isBumiputera: applicationData.company.isBumiputera,
          },
          pic: {
            name: applicationData.pic.name,
            designation: applicationData.pic.designation,
            phone: applicationData.pic.phone,
            email: applicationData.pic.email,
          },
          employees: {
            total: applicationData.employees.total,
            management: applicationData.employees.management,
            permanent: applicationData.employees.permanent,
            contract: applicationData.employees.contract,
            repetitive: applicationData.employees.repetitive,
          },
          scopeIndustry: {
            scope: applicationData.scopeIndustry.scope,
            industryType: applicationData.scopeIndustry.industryType,
            includeSites: applicationData.scopeIndustry.includeSites,
            sitesCount: applicationData.scopeIndustry.sitesCount,
          },
          certificationType: applicationData.certificationType,
          industryType: applicationData.scopeIndustry.industryType,
        },
      });

      // Simpan result ke sessionStorage
      sessionStorage.setItem(
        'scale-last-result',
        JSON.stringify(response.data),
      );

      // Reset state
      resetQuestionnaire();
      resetApplication();

      // Navigate ke result page
      navigate('/result');
    } catch (err) {
      const message =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to submit questionnaire. Please try again.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
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

  return (
    <div className="space-y-4">
      {submitError && (
        <div className="max-w-3xl bg-red-50 border border-red-200 rounded p-4">
          <p className="text-sm text-red-800 font-medium">
            ❌ {submitError}
          </p>
        </div>
      )}

      {isSubmitting && (
        <div className="max-w-3xl bg-blue-50 border border-blue-200 rounded p-4">
          <p className="text-sm text-blue-800 font-medium">
            ⏳ Submitting questionnaire... Please wait.
          </p>
        </div>
      )}

      <SectionWizard
        sections={sections}
        onComplete={handleComplete}
      />
    </div>
  );
}


