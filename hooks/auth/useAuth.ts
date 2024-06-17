import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, signInAsync, signUpAsync } from '@/slices/auth';
import { AppDispatch, RootState } from '@/store';
import { clearWalletState } from '@/slices/wallet';
import { clearUsersState } from '@/slices/users';
import { clearOrdersState } from '@/slices/orders';
import { clearEarningsState } from '@/slices/earnings';
import { clearAttachmentState } from '@/slices/attachments';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const signIn = useCallback(async (value: { email: string; password: string, rememberMe: boolean }) => {
    dispatch(signInAsync(value));
  }, [dispatch]);

  const signUp = useCallback(async (value: { name: string; email: string; phone: string; password: string }) => {
    dispatch(signUpAsync(value));
  }, [dispatch]);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('userCredentials');
    dispatch(clearWalletState());
    dispatch(clearUsersState());
    dispatch(clearOrdersState());
    dispatch(clearEarningsState());
    dispatch(clearAttachmentState());
    dispatch(clearUser());
  }, [dispatch]);

  return {
    signIn,
    signUp,
    signOut,
    loading,
    error
  };
}
