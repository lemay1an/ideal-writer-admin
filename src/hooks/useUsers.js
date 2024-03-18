import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/apiUsers';
import { useAppState } from '../context/userContext';

export function useUsers() {
  const { token } = useAppState();
  console.log(token);
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(token),
  });

  return { data, isLoading, error };
}
