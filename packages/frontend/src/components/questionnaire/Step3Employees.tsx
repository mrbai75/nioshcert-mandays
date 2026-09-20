import { useApplicationStore } from '@/lib/applicationStore';
import { FormNumber } from '@/components/forms/FormNumber';

export function Step3Employees() {
  const employees = useApplicationStore((s) => s.data.employees);
  const updateEmployees = useApplicationStore((s) => s.updateEmployees);

  // Auto-kira total dari breakdown
  const autoTotal =
    (employees.management ?? 0) +
    (employees.permanent ?? 0) +
    (employees.contract ?? 0) +
    (employees.repetitive ?? 0);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Number of Employees
        </h2>
        <p className="text-sm text-gray-600">
          Provide the number of employees for each category.
        </p>
      </div>

      {/* Breakdown dulu */}
      <div className="grid grid-cols-2 gap-4">
        <FormNumber
          label="Management"
          value={employees.management}
          onChange={(v) => updateEmployees({ management: v })}
          required
          helpText="e.g. Manager, General Manager, Director"
        />
        <FormNumber
          label="Permanent Staffs"
          value={employees.permanent}
          onChange={(v) => updateEmployees({ permanent: v })}
          required
          helpText="Head office and/or branches — e.g. Engineer, Executive, Officer"
        />
        <FormNumber
          label="Contract Workers"
          value={employees.contract}
          onChange={(v) => updateEmployees({ contract: v })}
          required
          helpText="Head office and/or branches — e.g. Cleaner, Security Guard, Project Site Workers"
        />
        <FormNumber
          label="Repetitive Workers"
          value={employees.repetitive}
          onChange={(v) => updateEmployees({ repetitive: v })}
          required
          helpText="Simple, repetitive tasks — e.g. cleaners, security, transport, sales, call centre"
        />
      </div>

      {/* Total auto-kira, papar bawah */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-900">
              Total Number of Employees
            </p>
            <p className="text-xs text-blue-700 mt-0.5">
              Auto-calculated from categories above
            </p>
          </div>
          <p className="text-2xl font-bold text-blue-900">{autoTotal}</p>
        </div>
      </div>
    </div>
  );
}
