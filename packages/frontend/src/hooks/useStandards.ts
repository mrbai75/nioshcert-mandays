import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Standard {
  id: string;
  code: string;
  version: string;
  name: string;
  referenceDoc: string;
  effectiveDate: string;
  isActive: boolean;
}

interface StandardsResponse {
  success: boolean;
  data: {
    items: Standard[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export function useStandards() {
  return useQuery({
    queryKey: ['standards'],
    queryFn: async () => {
      const res = await api.get<StandardsResponse>('/standards');
      return res.data.items;
    },
    staleTime: 5 * 60 * 1000,
  });
}
