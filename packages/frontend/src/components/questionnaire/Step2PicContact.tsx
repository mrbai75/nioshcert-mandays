import { useApplicationStore } from '@/lib/applicationStore';
import { FormInput } from '@/components/forms/FormInput';

export function Step2PicContact() {
  const pic = useApplicationStore((s) => s.data.pic);
  const updatePic = useApplicationStore((s) => s.updatePic);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Contact Person
        </h2>
        <p className="text-sm text-gray-600">
          Person to be contacted for this application.
        </p>
      </div>

      <FormInput
        label="Proposal to be issued to (full name as per IC)"
        value={pic.name}
        onChange={(v) => updatePic({ name: v })}
        placeholder="e.g. Mr. Ali Bin Abu"
        required
      />

      <FormInput
        label="Designation"
        value={pic.designation}
        onChange={(v) => updatePic({ designation: v })}
        placeholder="e.g. General Manager"
        required
      />

      <FormInput
        label="H/Phone No"
        value={pic.phone}
        onChange={(v) => updatePic({ phone: v })}
        placeholder="e.g. 012-3456789"
        required
      />

      <FormInput
        label="Email"
        type="email"
        value={pic.email}
        onChange={(v) => updatePic({ email: v })}
        placeholder="e.g. ali@company.com"
        required
      />
    </div>
  );
}
