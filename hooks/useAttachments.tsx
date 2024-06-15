import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchUserProfilePictureThunk, uploadUserProfilePictureThunk } from '@/slices/attachments';

export default function useAttachments() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading,
    profilePicture,
    error,
  } = useSelector((state: RootState) => state.attachments);

  const fetchProfilePicture = useCallback((id: string) => {
    dispatch(fetchUserProfilePictureThunk(id));
  }, [dispatch]);

  const uploadProfilePicture = useCallback((uri: string, userId: string) => {
    dispatch(uploadUserProfilePictureThunk({ uri, userId }));
  }, [dispatch]);

  return {
    profilePicture,
    loading,
    error,
    fetchProfilePicture,
    uploadProfilePicture
  };
}
