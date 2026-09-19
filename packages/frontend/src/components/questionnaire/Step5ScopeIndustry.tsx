import { useApplicationStore } from '@/lib/applicationStore';
import { FormTextarea } from '@/components/forms/FormTextarea';
import { FormSelect } from '@/components/forms/FormSelect';
import { FormNumber } from '@/components/forms/FormNumber';

// 40 industry options (IAF Code)
const INDUSTRY_OPTIONS = [
  'Agriculture, forestry and fishing',
  'Mining and Quarrying',
  'Food products, beverages and tobacco',
  'Textiles and Textiles Products',
  'Leather and leather products',
  'Wood and wood products',
  'Pulp, paper and paper products',
  'Publishing companies',
  'Printing companies',
  'Manufacture of coke and refined petroleum products',
  'Nuclear fuel',
  'Chemicals, chemical products and fibre',
  'Pharmaceuticals',
  'Rubber and plastic products',
  'Non-metallic mineral products',
  'Concrete, cement, lime, plaster etc.',
  'Basic metals and fabricated metal products',
  'Machinery and equipment',
  'Electrical and optical equipment',
  'Shipbuilding',
  'Aerospace',
  'Other transport equipment',
  'Manufacturing not elsewhere classified',
  'Recycling',
  'Electricity supply',
  'Gas supply',
  'Water supply',
  'Construction',
  'Wholesale and retail trade; Repair of motor vehicles, motorcycles and personal and household goods',
  'Hotels and restaurant',
  'Transport, Storage and Communication',
  'Financial intermediation; real estate; renting',
  'Information technology',
  'Engineering services',
  'Other services',
  'Public administration',
  'Education',
  'Health and social work',
  'Other social activities',
  'Palm Oil Industry',
].map((name, i) => ({ value: name, label: `${i + 1}. ${name}` }));

export function Step5ScopeIndustry() {
  const scopeIndustry = useApplicationStore((s) => s.data.scopeIndustry);
  const updateScopeIndustry = useApplicationStore((s) => s.updateScopeIndustry);

  return (
    <div className="space-y-6">
      {/* Scope */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Scope of Certification
          </h2>
          <p className="text-sm text-gray-600">
            Nature of business. Be specific.
          </p>
        </div>

        <FormTextarea
          label="Scope of Certification (Nature of business)"
          value={scopeIndustry.scope}
          onChange={(v) => updateScopeIndustry({ scope: v })}
          placeholder={'Example:\n1. Manufacturing of table\n2. Provision of project management'}
          required
          rows={4}
        />
      </div>

      {/* Industry */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Type of Industry
          </h2>
          <p className="text-sm text-gray-600">
            Select the most relevant based on your nature of business.
          </p>
        </div>

        <FormSelect
          label="Type of Industry"
          value={scopeIndustry.industryType}
          onChange={(v) => updateScopeIndustry({ industryType: v })}
          options={INDUSTRY_OPTIONS}
          placeholder="Select industry"
          required
        />
      </div>

      {/* Sites */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Sites / Branches
          </h2>
          <p className="text-sm text-gray-600">
            Do you want to include your sites/branches into the certification?
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="includeSites"
            checked={scopeIndustry.includeSites}
            onChange={(e) =>
              updateScopeIndustry({ includeSites: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="includeSites" className="text-sm text-gray-700">
            Yes, include sites/branches
          </label>
        </div>

        {scopeIndustry.includeSites && (
          <div className="space-y-3 pl-6 border-l-2 border-amber-300">
            <FormNumber
              label="Total Number of Sites/Branches"
              value={scopeIndustry.sitesCount}
              onChange={(v) => updateScopeIndustry({ sitesCount: v })}
              min={1}
            />

            <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800">
              <p className="font-medium mb-1">Note:</p>
              <p>
                Multi-site certification is currently under development. Our BD
                team will contact you to discuss your multi-site setup
                separately. For now, the calculation will be based on your HQ.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
