import { useQuery } from '@tanstack/react-query';
import { getQueries } from '../../services/apiQuery';

export function useContacts() {
  const {
    data: queries,
    isLoading: gettingQueries,
    error,
  } = useQuery({
    queryFn: getQueries,
    queryKey: ['queries'],
  });

  return { queries, gettingQueries, error };
}
