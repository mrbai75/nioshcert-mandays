import { useApplicationStore } from '@/lib/applicationStore';
import { useStandards } from '@/hooks/useStandards';

export function Step3StandardSelection() {
  const certificationType = useApplicationStore((s) => s.data.certificationType);
  const standards = useApplicationStore((s) => s.data.standards);
  const toggleStandard = useApplicationStore((s) => s.toggleStandard);
  const selectSingleStandard = useApplicationStore((s) => s.selectSingleStandard);
  const { data: availableStandards, isLoading, isError } = useStandards();

  const isSingle = certificationType === 'SINGLE';

  const handleToggle = (code: string) => {
    if (isSingle) {
      selectSingleStandard(code);
    } else {
      toggleStandard(code);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Select Standard{certificationType === 'INTEGRATED' ? 's' : ''}
      </h2>
      <p className="text-sm text-gray-600">
        {isSingle
          ? 'Choose one standard.'
          : 'Choose two or more standards for integrated certification.'}
      </p>

      {isLoading && (
        <p className="text-sm text-gray-500">Loading standards...</p>
      )}
      {isError && (
        <p className="text-sm text-red-600">
          Failed to load standards. Please refresh.
        </p>
      )}

      {availableStandards && (
        <div className="space-y-2">
          {availableStandards.map((s) => {
            const checked = standards.includes(s.code);
            return (
              <label
                key={s.id}
                className={`flex items-start gap-3 p-4 border rounded cursor-pointer transition ${
                  checked
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type={isSingle ? 'radio' : 'checkbox'}
                  checked={checked}
                  onChange={() => handleToggle(s.code)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-medium bg-gray-100 px-2 py-0.5 rounded">
                      {s.code}
                    </span>
                    <span className="font-medium text-gray-900">{s.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Reference: {s.referenceDoc}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      )}

      {standards.length > 0 && (
        <p className="text-xs text-gray-600 pt-2">
          Selected: <span className="font-medium">{standards.join(', ')}</span>
        </p>
      )}
    </div>
  );
}
