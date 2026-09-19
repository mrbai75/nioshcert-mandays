import { useRoleStore, ROLE_LABELS, type Role } from '@/lib/roleStore';

const ROLES: Role[] = ['PIC', 'BD', 'ATD_OFFICER', 'ATD_MANAGER', 'SUPER_ADMIN'];

export function RoleSwitcher() {
  const role = useRoleStore((s) => s.role);
  const setRole = useRoleStore((s) => s.setRole);

  return (
    <select
      value={role}
      onChange={(e) => setRole(e.target.value as Role)}
      className="text-sm border border-gray-300 rounded px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {ROLES.map((r) => (
        <option key={r} value={r}>
          {ROLE_LABELS[r]}
        </option>
      ))}
    </select>
  );
}
