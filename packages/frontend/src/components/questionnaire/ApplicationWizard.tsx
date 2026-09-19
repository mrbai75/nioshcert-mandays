import { useApplicationStore } from '@/lib/applicationStore';
import { Step1CompanyInfo } from './Step1CompanyInfo';
import { Step2CertificationType } from './Step2CertificationType';
import { Step3StandardSelection } from './Step3StandardSelection';
import { Step4EmployeesIndustry } from './Step4EmployeesIndustry';

const STEPS = [
  { num: 1, title: 'Company Info', component: Step1CompanyInfo },
  { num: 2, title: 'Certification Type', component: Step2CertificationType },
  { num: 3, title: 'Standards', component: Step3StandardSelection },
  { num: 4, title: 'Employees & Industry', component: Step4EmployeesIndustry },
];

function validateStep(
  step: number,
  data: ReturnType<typeof useApplicationStore.getState>['data'],
): string | null {
  if (step === 1) {
    if (!data.company.name.trim()) return 'Company name is required';
    if (!data.company.address.trim()) return 'Address is required';
    if (!data.company.legalStatus) return 'Legal status is required';
    if (!data.company.orgType) return 'Organization type is required';
    if (!data.company.contactName.trim()) return 'Contact name is required';
    if (!data.company.contactEmail.trim()) return 'Contact email is required';
  }
  if (step === 2) {
    if (!data.certificationType) return 'Certification type is required';
  }
  if (step === 3) {
    if (data.standards.length === 0) return 'Select at least one standard';
    if (data.certificationType === 'SINGLE' && data.standards.length > 1)
      return 'Single certification allows only one standard';
    if (data.certificationType === 'INTEGRATED' && data.standards.length < 2)
      return 'Integrated certification requires at least two standards';
  }
  if (step === 4) {
    if (!data.industryType.trim()) return 'Industry type is required';
  }
  return null;
}

export function ApplicationWizard() {
  const step = useApplicationStore((s) => s.step);
  const setStep = useApplicationStore((s) => s.setStep);
  const data = useApplicationStore((s) => s.data);
  const reset = useApplicationStore((s) => s.reset);

  const CurrentStep = STEPS[step - 1].component;
  const isLastStep = step === STEPS.length;

  const handleNext = () => {
    const error = validateStep(step, data);
    if (error) {
      alert(error);
      return;
    }
    if (isLastStep) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // TODO Fasa 8.5: submit ke backend + redirect ke questionnaire
    alert('Continue to Questionnaire — akan diimplement dalam Fasa 8.5');
    console.log('Form data:', data);
  };

  const handleReset = () => {
    if (confirm('Reset borang? Semua data akan hilang.')) {
      reset();
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">New Application</h1>
          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-red-600"
          >
            Reset
          </button>
        </div>
        <div className="flex items-center gap-1">
          {STEPS.map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  s.num === step
                    ? 'bg-blue-600 text-white'
                    : s.num < step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s.num}
              </div>
              <div className="ml-2 text-xs text-gray-600 hidden sm:block">
                {s.title}
              </div>
              {idx < STEPS.length - 1 && (
                <div className="flex-1 h-px bg-gray-200 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <CurrentStep />
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isLastStep ? 'Continue to Questionnaire' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
