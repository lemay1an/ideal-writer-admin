import { useMutation } from '@tanstack/react-query';
import { createBlog } from '../services/apiBlogs';

export function useCreateBlogs() {
  const {
    mutate: createBlogAPI,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createBlog,
    onError: (err) => {
      console.log(err);
    },
  });

  return { createBlogAPI, isLoading, error };
}
