import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../services/apiUsers';
import { useAppState } from '../context/userContext';

export function useLogIn() {
  const queryClient = useQueryClient();
  const { dispatch } = useAppState();
  const navigate = useNavigate();
  const { mutate: logInFn, isLoading } = useMutation({
    mutationFn: ({ email, password }) => logIn({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      toast.success('Log in Successfull');
      dispatch({ type: 'user/current', payload: { user: data.data.user, token: data.token } });
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error('Provided email and password are incorect');
    },
  });

  return { logInFn, isLoading };
}
