import { useApplicationStore } from '@/lib/applicationStore';
import { FormNumber } from '@/components/forms/FormNumber';
import { FormTextarea } from '@/components/forms/FormTextarea';

export function Step4ShiftOutsource() {
  const shift = useApplicationStore((s) => s.data.shift);
  const updateShift = useApplicationStore((s) => s.updateShift);

  return (
    <div className="space-y-6">
      {/* Shift Operations */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Shift Operations
          </h2>
          <p className="text-sm text-gray-600">
            Does your operation run in shifts?
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hasShift"
            checked={shift.hasShift}
            onChange={(e) => updateShift({ hasShift: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="hasShift" className="text-sm text-gray-700">
            Yes, operation runs in shifts
          </label>
        </div>

        {shift.hasShift && (
          <div className="space-y-3 pl-6 border-l-2 border-blue-200">
            <p className="text-sm text-gray-600">
              Indicate the number of employees per shift:
            </p>
            <FormNumber
              label="1st Shift"
              value={shift.shift1}
              onChange={(v) => updateShift({ shift1: v })}
            />
            <FormNumber
              label="2nd Shift"
              value={shift.shift2}
              onChange={(v) => updateShift({ shift2: v })}
            />
            <FormNumber
              label="3rd Shift"
              value={shift.shift3}
              onChange={(v) => updateShift({ shift3: v })}
            />
          </div>
        )}
      </div>

      {/* Outsource */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Outsource Activities
          </h2>
          <p className="text-sm text-gray-600">
            State any activities that are outsourced (if any).
          </p>
        </div>

        <FormTextarea
          label="Outsource Activities"
          value={shift.outsourceActivities}
          onChange={(v) => updateShift({ outsourceActivities: v })}
          placeholder="e.g. Logistic / Transportation / Design / Packaging"
          rows={3}
        />
      </div>
    </div>
  );
}
