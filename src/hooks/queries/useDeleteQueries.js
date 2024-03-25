import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuery } from '../../services/apiQuery';

export function useDeleteQuery() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteQueryAPI,
    isLoading: deletingQuery,
    error,
  } = useMutation({
    mutationFn: deleteQuery,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['queries'],
      });
      toast.success('Deleted successful');
    },
  });

  return { deleteQueryAPI, deletingQuery, error };
}
