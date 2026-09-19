import { useApplicationStore, calculateTotalFte } from '@/lib/applicationStore';
import { FormNumber } from '@/components/forms/FormNumber';
import { FormInput } from '@/components/forms/FormInput';

export function Step4EmployeesIndustry() {
  const fte = useApplicationStore((s) => s.data.fte);
  const updateFte = useApplicationStore((s) => s.updateFte);
  const industryType = useApplicationStore((s) => s.data.industryType);
  const cpiScore = useApplicationStore((s) => s.data.cpiScore);
  const updateIndustry = useApplicationStore((s) => s.updateIndustry);

  const total = calculateTotalFte(fte);

  return (
    <div className="space-y-6">
      {/* Number of Employees */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Number of Employees
          </h2>
          <p className="text-sm text-gray-600">
            Enter the number of employees for each category.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormNumber
            label="Management Staff"
            value={fte.management}
            onChange={(v) => updateFte({ management: v })}
            required
            helpText="Top management personnel"
          />
          <FormNumber
            label="Permanent Employees"
            value={fte.permanent}
            onChange={(v) => updateFte({ permanent: v })}
            required
            helpText="Full-time permanent employees"
          />
          <FormNumber
            label="Contract Workers"
            value={fte.contract}
            onChange={(v) => updateFte({ contract: v })}
            required
            helpText="Counted at 50% weightage"
          />
          <div>
            <FormNumber
              label="Repetitive Workers"
              value={fte.repetitive}
              onChange={(v) => updateFte({ repetitive: v })}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Workers doing simple, repetitive tasks — e.g. cleaners, security
              guards, production line operators
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-gray-700">
              Total Employees
            </span>
            <span className="text-2xl font-bold text-blue-700">
              {total.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Industry */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Industry Type
          </h2>
          <p className="text-sm text-gray-600">
            Specify the industry your company operates in.
          </p>
        </div>

        <FormInput
          label="Industry Type"
          value={industryType}
          onChange={(v) => updateIndustry(v, cpiScore)}
          placeholder="e.g. Construction, Information Technology"
          required
        />
      </div>
    </div>
  );
}
