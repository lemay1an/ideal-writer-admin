import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '../services/apiBlogs';

export function useBlogs() {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });

  return { blogs, isLoading, error };
}
