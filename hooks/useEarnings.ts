import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchPaidEarningsThunk, fetchUnpaidEarningsThunk } from '@/slices/earnings';

export default function useEarnings() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading,
    error,
    paid: paidEarnings,
    unpaid: unpaidEarnings
  } = useSelector((state: RootState) => state.earnings);

  const fetchAllPaidEarnings = useCallback(() => {
    dispatch(fetchPaidEarningsThunk());
  }, [dispatch]);

  const fetchAllUnpaidEarnings = useCallback(() => {
    dispatch(fetchUnpaidEarningsThunk());
  }, [dispatch]);

  return {
    loading,
    error,
    paidEarnings,
    unpaidEarnings,
    fetchAllPaidEarnings,
    fetchAllUnpaidEarnings
  };
}
