import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchWalletThunk, setupWalletThunk, updateThresholdThunk, withdrawWalletThunk } from '@/slices/wallet';

export default function useWallet() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading,
    error,
    wallet
  } = useSelector((state: RootState) => state.wallet);

  const fetchWallet = useCallback((id: string) => {
    dispatch(fetchWalletThunk(id));
  }, [dispatch]);

  const withdrawWallet = useCallback((userId: string, amount: number) => {
    dispatch(withdrawWalletThunk({ userId, amount }));
  }, [dispatch]);

  const updateThreshold = useCallback((userId: string, amount: number) => {
    dispatch(updateThresholdThunk({ userId, amount }));
  }, [dispatch]);

  const setupWallet = useCallback((userId: string) => {
    dispatch(setupWalletThunk({ userId }));
  }, [dispatch]);

  return {
    loading,
    error,
    wallet,
    fetchWallet,
    withdrawWallet,
    updateThreshold,
    setupWallet
  };
}
