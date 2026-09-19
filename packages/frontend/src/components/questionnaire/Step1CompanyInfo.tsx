import { useApplicationStore } from '@/lib/applicationStore';
import { FormInput } from '@/components/forms/FormInput';
import { FormTextarea } from '@/components/forms/FormTextarea';
import { FormSelect } from '@/components/forms/FormSelect';

export function Step1CompanyInfo() {
  const company = useApplicationStore((s) => s.data.company);
  const updateCompany = useApplicationStore((s) => s.updateCompany);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Company Information
      </h2>

      <FormInput
        label="Company Name"
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

      <div className="grid grid-cols-2 gap-4">
        <FormSelect
          label="Legal Status"
          value={company.legalStatus}
          onChange={(v) => updateCompany({ legalStatus: v })}
          options={[
            { value: 'ROC', label: 'ROC (Sdn Bhd / Bhd)' },
            { value: 'ROB', label: 'ROB (Enterprise)' },
          ]}
          placeholder="Select legal status"
          required
        />

        <FormSelect
          label="Organization Type"
          value={company.orgType}
          onChange={(v) => updateCompany({ orgType: v })}
          options={[
            { value: 'Private', label: 'Private' },
            { value: 'Government', label: 'Government' },
          ]}
          placeholder="Select org type"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bumiputera"
          checked={company.isBumiputera}
          onChange={(e) => updateCompany({ isBumiputera: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="bumiputera" className="text-sm text-gray-700">
          Bumiputera Status
        </label>
      </div>

      <h3 className="text-md font-semibold text-gray-900 pt-4 border-t border-gray-200">
        Contact Person (PIC)
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Contact Name"
          value={company.contactName}
          onChange={(v) => updateCompany({ contactName: v })}
          required
        />
        <FormInput
          label="Designation"
          value={company.contactDesignation}
          onChange={(v) => updateCompany({ contactDesignation: v })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Phone"
          value={company.contactPhone}
          onChange={(v) => updateCompany({ contactPhone: v })}
          required
        />
        <FormInput
          label="Email"
          type="email"
          value={company.contactEmail}
          onChange={(v) => updateCompany({ contactEmail: v })}
          required
        />
      </div>
    </div>
  );
}
