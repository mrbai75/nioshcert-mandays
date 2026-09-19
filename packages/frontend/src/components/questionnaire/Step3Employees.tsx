import { useApplicationStore, calculateTotalFte } from '@/lib/applicationStore';
import { FormNumber } from '@/components/forms/FormNumber';

export function Step3Employees() {
  const employees = useApplicationStore((s) => s.data.employees);
  const updateEmployees = useApplicationStore((s) => s.updateEmployees);

  const totalFte = calculateTotalFte(employees);

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

      <FormNumber
        label="Total Number of Employees"
        value={employees.total}
        onChange={(v) => updateEmployees({ total: v })}
        min={1}
        required
        helpText="Overall headcount of the organisation"
      />

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
    </div>
  );
}
