import { useNavigate } from 'react-router-dom';
import { useApplicationStore } from '@/lib/applicationStore';
import { Step1CompanyInfo } from './Step1CompanyInfo';
import { Step2PicContact } from './Step2PicContact';
import { Step3Employees } from './Step3Employees';
import { Step4ShiftOutsource } from './Step4ShiftOutsource';
import { Step5ScopeIndustry } from './Step5ScopeIndustry';
import { Step6Certifications } from './Step6Certifications';
import { Step7Documentation } from './Step7Documentation';

const STEPS = [
  { num: 1, title: 'Company', component: Step1CompanyInfo },
  { num: 2, title: 'Contact', component: Step2PicContact },
  { num: 3, title: 'Employees', component: Step3Employees },
  { num: 4, title: 'Shift', component: Step4ShiftOutsource },
  { num: 5, title: 'Scope & Industry', component: Step5ScopeIndustry },
  { num: 6, title: 'Standards', component: Step6Certifications },
  { num: 7, title: 'Documentation', component: Step7Documentation },
];

function validateStep(
  step: number,
  data: ReturnType<typeof useApplicationStore.getState>['data'],
): string | null {
  if (step === 1) {
    if (!data.company.name.trim()) return 'Company name is required';
    if (!data.company.address.trim()) return 'Address is required';
    if (!data.company.legalStatus.trim()) return 'Legal status is required';
    if (!data.company.orgType) return 'Organisation type is required';
  }
  if (step === 2) {
    if (!data.pic.name.trim()) return 'Contact name is required';
    if (!data.pic.designation.trim()) return 'Designation is required';
    if (!data.pic.phone.trim()) return 'Phone number is required';
    if (!data.pic.email.trim()) return 'Email is required';
  }
  if (step === 3) {
    if (data.employees.total < 1) return 'Total employees is required';
  }
  if (step === 5) {
    if (!data.scopeIndustry.scope.trim()) return 'Scope is required';
    if (!data.scopeIndustry.industryType) return 'Industry type is required';
    if (data.scopeIndustry.includeSites && data.scopeIndustry.sitesCount < 1)
      return 'Number of sites is required';
  }
  if (step === 6) {
    if (data.standards.length === 0) return 'Select at least one standard';
    if (data.certificationType === 'SINGLE' && data.standards.length > 1)
      return 'Single certification allows only one standard';
    if (data.certificationType === 'INTEGRATED' && data.standards.length < 2)
      return 'Integrated certification requires at least two standards';
  }
  if (step === 7) {
    if (!data.additional.declaration) return 'Please accept the declaration';
  }
  return null;
}

export function ApplicationWizard() {
  const step = useApplicationStore((s) => s.step);
  const setStep = useApplicationStore((s) => s.setStep);
  const data = useApplicationStore((s) => s.data);
  const reset = useApplicationStore((s) => s.reset);
  const navigate = useNavigate();

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
    // Redirect ke questionnaire answers page
    navigate('/questionnaire/answers');
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
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {STEPS.map((s, idx) => (
            <div key={s.num} className="flex items-center shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                    s.num === step
                      ? 'bg-blue-600 text-white'
                      : s.num < step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s.num}
                </div>
                <div className="text-xs text-gray-600 hidden lg:block whitespace-nowrap">
                  {s.title}
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="w-4 h-px bg-gray-200 mx-2" />
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
          {'Next →'}
        </button>
      </div>
    </div>
  );
}
