import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInAsync, signUpAsync } from '@/slices/auth';
import { AppDispatch, RootState } from '@/store';

export default function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const signIn = useCallback(async (value: { email: string; password: string }) => {
    dispatch(signInAsync(value));
  }, [dispatch]);

  const signUp = useCallback(async (value: { name: string; email: string; phone: string; password: string }) => {
    dispatch(signUpAsync(value));
  }, [dispatch]);

  return {
    signIn,
    signUp,
    loading,
  };
}
