import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firestore } from '@/firebase';

interface UsersState {
  profilePicture: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  profilePicture: null,
  loading: false,
  error: null,
};

export const fetchUserProfilePictureThunk = createAsyncThunk(
  'attachments/fetchUserProfilePicture',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userDocRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data().profilePicture;
      } else {
        throw new Error('User not found');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadUserProfilePictureThunk = createAsyncThunk(
  'attachments/uploadUserProfilePicture',
  async ({ uri, userId }: { uri: string, userId: string }, { rejectWithValue }) => {
    try {
      const blob: Blob = await fetch(uri).then(response => response.blob());

      const storage = getStorage();
      const storageRef = ref(storage, `profile_pictures/${userId}`);

      const uploadTask = await uploadBytesResumable(storageRef, blob);
      const downloadURL = await getDownloadURL(uploadTask.ref);

      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, {
        profilePicture: downloadURL,
      });

      return downloadURL;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const attachmentsSlice = createSlice({
  name: 'attachments',
  initialState,
  reducers: {
    clearAttachmentState: () => initialState,
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfilePictureThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfilePictureThunk.fulfilled, (state, action) => {
        state.profilePicture = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfilePictureThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadUserProfilePictureThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadUserProfilePictureThunk.fulfilled, (state, action) => {
        state.profilePicture = action.payload;
        state.loading = false;
      })
      .addCase(uploadUserProfilePictureThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    ;
  },
});

export const { clearAttachmentState, clearError } = attachmentsSlice.actions;
export default attachmentsSlice.reducer;