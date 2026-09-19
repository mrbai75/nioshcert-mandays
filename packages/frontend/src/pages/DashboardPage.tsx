import { useRoleStore, ROLE_LABELS } from '@/lib/roleStore';

export function DashboardPage() {
  const role = useRoleStore((s) => s.role);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome, {ROLE_LABELS[role]}
      </p>

      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        <p>Dashboard content coming soon</p>
        <p className="text-sm mt-2">
          Akan diisi dalam Fasa 8.4 ke atas
        </p>
      </div>
    </div>
  );
}
