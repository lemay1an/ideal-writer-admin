import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteBlog } from '../services/apiBlogs';

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteBlogAPI,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['blogs'],
      });
      toast.success('Deleted successful');
    },
    onError: (err) => {
      toast.success('Deleted successful');
    },
  });

  return { deleteBlogAPI, isDeleting, error };
}
