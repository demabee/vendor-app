import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchSpecificUserThunk, fetchUsersThunk, updateSpecificUserThunk } from '@/slices/users';
import { UserFormType } from '@/utils/types';

export default function useUsers() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading,
    users,
    specificUser,
    error,
  } = useSelector((state: RootState) => state.users);

  const fetchAllUsers = useCallback(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const fetchSpecificUser = useCallback((id: string) => {
    dispatch(fetchSpecificUserThunk(id));
  }, [dispatch]);

  const updateSpecificUser = useCallback((user: Partial<UserFormType>, userId: string) => {
    dispatch(updateSpecificUserThunk({ user, userId }));
  }, [dispatch]);

  return {
    users,
    specificUser,
    loading,
    error,
    fetchAllUsers,
    fetchSpecificUser,
    updateSpecificUser
  };
}
