import { useHealth } from '@/hooks/useHealth';

export function HealthPage() {
  const health = useHealth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">System Health</h1>
      <p className="text-gray-600 mb-6">Backend + database status</p>

      <div className="bg-white rounded-lg shadow p-6">
        {health.isLoading && <p className="text-gray-500">Loading...</p>}
        {health.isError && (
          <p className="text-red-600">
            Error: {(health.error as Error).message}
          </p>
        )}
        {health.data && (
          <div className="text-sm space-y-1">
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
            <p>
              <span className="font-medium">Timestamp:</span>{' '}
              {health.data.timestamp}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
