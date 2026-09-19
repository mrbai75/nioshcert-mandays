import { useApplicationStore } from '@/lib/applicationStore';

export function Step2CertificationType() {
  const certificationType = useApplicationStore((s) => s.data.certificationType);
  const setCertificationType = useApplicationStore((s) => s.setCertificationType);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Certification Type
      </h2>
      <p className="text-sm text-gray-600">
        Choose the type of certification you are applying for.
      </p>

      <div className="space-y-3">
        <label className="flex items-start gap-3 p-4 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="certificationType"
            value="SINGLE"
            checked={certificationType === 'SINGLE'}
            onChange={() => setCertificationType('SINGLE')}
            className="mt-1 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <div className="font-medium text-gray-900">Single Standard</div>
            <div className="text-sm text-gray-600">
              Certification for one standard (e.g. OSHMS only)
            </div>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="certificationType"
            value="INTEGRATED"
            checked={certificationType === 'INTEGRATED'}
            onChange={() => setCertificationType('INTEGRATED')}
            className="mt-1 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <div className="font-medium text-gray-900">
              Integrated (IMS)
            </div>
            <div className="text-sm text-gray-600">
              Certification for multiple standards simultaneously (e.g. OSHMS + EMS)
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
