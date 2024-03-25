import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deletePricing } from '../services/apiPricing';

export function useDeletePricing() {
  const queryClient = useQueryClient();
  const {
    mutate: deletePriceAPI,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id) => deletePricing(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['prices'],
      });
      toast.success('Deleted successful');
    },
    onError: (err) => {
      toast.success('Deleted successful');
    },
  });

  return { deletePriceAPI, isDeleting, error };
}
