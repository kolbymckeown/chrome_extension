import {
  useQuery as useBaseQuery,
  useMutation as useBaseMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { asynchrounousRequest } from '@/utils/api';

type UseQueryOptions = {
  queryKey?: string;
  enabled?: boolean;
};

export const queryClient = new QueryClient();

export default function useQuery<T>(
  url: string,
  fetchOptions?: { [key: string]: any },
  options?: UseQueryOptions
) {
  const response = useBaseQuery<T>({
    ...options,
    queryKey: [options?.queryKey || url],
    queryFn: () => asynchrounousRequest(url, fetchOptions),
  });

  return response;
}

type UseMutationOptions = {
  queryKey?: string;
};

export function useMutation(
  url: string,
  fetchOptions = {},
  options?: UseMutationOptions
) {
  const response = useBaseMutation({
    mutationFn: (body: { [key: string]: any }) =>
      asynchrounousRequest(url, { ...fetchOptions, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [options?.queryKey || url] });
    },
  });

  return response;
}
