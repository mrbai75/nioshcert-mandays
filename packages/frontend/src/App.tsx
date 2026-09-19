import { useHealth } from '@/hooks/useHealth';
import { useStandards } from '@/hooks/useStandards';

export default function App() {
  const health = useHealth();
  const standards = useStandards();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          NIOSHCert Mandays
        </h1>
        <p className="text-gray-600 mb-8">
          Frontend setup — Fasa 8.2 (API client + React Query)
        </p>

        {/* Health check */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Backend Status</h2>
          {health.isLoading && <p className="text-gray-500">Loading...</p>}
          {health.isError && (
            <p className="text-red-600">
              Error: {(health.error as Error).message}
            </p>
          )}
          {health.data && (
            <div className="text-sm">
              <p>
                <span className="font-medium">Status:</span>{' '}
                <span className="text-green-600">{health.data.status}</span>
              </p>
              <p>
                <span className="font-medium">Database:</span>{' '}
                <span className="text-green-600">{health.data.database}</span>
              </p>
              <p>
                <span className="font-medium">Uptime:</span>{' '}
                {Math.round(health.data.uptime)}s
              </p>
            </div>
          )}
        </div>

        {/* Standards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Standards</h2>
          {standards.isLoading && <p className="text-gray-500">Loading...</p>}
          {standards.isError && (
            <p className="text-red-600">
              Error: {(standards.error as Error).message}
            </p>
          )}
          {standards.data && (
            <ul className="space-y-2">
              {standards.data.map((s) => (
                <li key={s.id} className="flex items-center gap-3 text-sm">
                  <span className="font-mono font-medium bg-gray-100 px-2 py-1 rounded">
                    {s.code}
                  </span>
                  <span className="text-gray-700">{s.name}</span>
                  <span className="text-gray-400 text-xs">
                    v{s.version}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
