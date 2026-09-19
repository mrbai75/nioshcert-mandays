import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  database: string;
}

export function useHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => api.get<HealthResponse>('/health'),
    refetchInterval: 30000, // refresh tiap 30s
  });
}
