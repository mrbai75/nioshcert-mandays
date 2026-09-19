import { useApplicationStore } from '@/lib/applicationStore';
import { FormInput } from '@/components/forms/FormInput';
import { FormTextarea } from '@/components/forms/FormTextarea';
import { FormSelect } from '@/components/forms/FormSelect';

export function Step1CompanyInfo() {
  const company = useApplicationStore((s) => s.data.company);
  const updateCompany = useApplicationStore((s) => s.updateCompany);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Company Information
        </h2>
        <p className="text-sm text-gray-600">
          Basic details about your organisation.
        </p>
      </div>

      <FormInput
        label="Name of Company / Organisation"
        value={company.name}
        onChange={(v) => updateCompany({ name: v })}
        placeholder="e.g. HYTRO VISTA SDN BHD"
        required
      />

      <FormTextarea
        label="Address"
        value={company.address}
        onChange={(v) => updateCompany({ address: v })}
        placeholder="Full address"
        required
        rows={3}
      />

      <FormInput
        label="Legal Status (R.O.C. No. or R.O.B. No.)"
        value={company.legalStatus}
        onChange={(v) => updateCompany({ legalStatus: v })}
        placeholder="e.g. 1234567-X"
        required
      />

      <FormSelect
        label="Type of Organisation"
        value={company.orgType}
        onChange={(v) => updateCompany({ orgType: v })}
        options={[
          { value: 'Government', label: 'Government' },
          { value: 'Private', label: 'Private' },
          { value: 'Other', label: 'Other' },
        ]}
        placeholder="Select type"
        required
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bumiputera"
          checked={company.isBumiputera}
          onChange={(e) => updateCompany({ isBumiputera: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="bumiputera" className="text-sm text-gray-700">
          Is your organization Bumiputera?
        </label>
      </div>
    </div>
  );
}
