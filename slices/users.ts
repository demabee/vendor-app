import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, query, collection, where, doc, updateDoc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';
import { Earning, UserData, UserFormType } from '@/utils/types';

interface UsersState {
  users: UserData[] | null;
  specificUser: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: null,
  specificUser: null,
  loading: false,
  error: null,
};

export const fetchUsersThunk = createAsyncThunk(
  'users/fetchUsersThunk',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(firestore, 'users'));
      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as UserData));
      return users;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSpecificUserThunk = createAsyncThunk(
  'users/fetchSpecificUserThunk',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userDocRef = doc(firestore, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        return { id: userDocSnap.id, ...userDocSnap.data() } as UserData;
      } else {
        throw new Error('User not found');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSpecificUserThunk = createAsyncThunk(
  'users/updateSpecificUser',
  async (payload: { user: Partial<UserFormType>, userId: string }, { rejectWithValue, dispatch }) => {
    try {
      const { user, userId } = payload;
      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, user);

      const updatedUserDocSnap = await getDoc(userDocRef);
      if (updatedUserDocSnap.exists()) {
        const updatedUserData = { id: updatedUserDocSnap.id, ...updatedUserDocSnap.data() } as UserData;
        dispatch(fetchSpecificUserThunk(userId));
        return updatedUserData;
      } else {
        throw new Error('User not found after update');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsersState: () => initialState,
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSpecificUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecificUserThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.specificUser = action.payload;
          state.loading = false;
        }
      })
      .addCase(fetchSpecificUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSpecificUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSpecificUserThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.specificUser = action.payload;
          state.loading = false;
        }
      })
      .addCase(updateSpecificUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      ;
  },
});

export const { clearUsersState, clearError } = usersSlice.actions;
export default usersSlice.reducer;