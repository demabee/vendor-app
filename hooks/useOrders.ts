import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { acceptOrderThunk, fetchActiveOrdersThunk, fetchPendingOrdersThunk, fetchSpecificOrderThunk } from '@/slices/orders';

export default function useOrders() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading,
    error,
    specificOrder,
    pending: pendingOrders,
    active: activeOrders
  } = useSelector((state: RootState) => state.orders);

  const fetchAllPendingOrders = useCallback(() => {
    dispatch(fetchPendingOrdersThunk());
  }, [dispatch]);

  const fetchAllActiveOrders = useCallback(() => {
    dispatch(fetchActiveOrdersThunk());
  }, [dispatch]);

  const fetchSpecificOrder = useCallback((id: string) => {
    dispatch(fetchSpecificOrderThunk(id));
  }, [dispatch]);

  const acceptOrder = useCallback((id: string) => {
    dispatch(acceptOrderThunk(id));
  }, [dispatch]);

  return {
    loading,
    error,
    specificOrder,
    pendingOrders,
    activeOrders,
    fetchAllPendingOrders,
    fetchAllActiveOrders,
    fetchSpecificOrder,
    acceptOrder
  };
}
