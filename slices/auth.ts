// src/store/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, firestore } from '@/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const autoSignInAsync = createAsyncThunk(
  'auth/autoSignIn',
  async (_, { rejectWithValue }) => {
    try {
      const credentials = await AsyncStorage.getItem('userCredentials');

      if (credentials) {
        const { email, password } = JSON.parse(credentials);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      }

      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInAsync = createAsyncThunk(
  'auth/signIn',
  async ({ email, password, rememberMe }: { email: string; password: string, rememberMe: boolean }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('userCredentials', JSON.stringify({ email, password, rememberMe }));
      return userCredential.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpAsync = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, phone, name }: { email: string; password: string, phone: string, name: string }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        id: user.uid,
        phoneNumber: phone,
        displayName: name,
        createdAt: serverTimestamp(),
      });
      return userCredential.user;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { displayName, email, uid, phoneNumber, photoURL } = action.payload;
      state.user = {
        displayName,
        email,
        uid,
        phoneNumber,
        photoURL
      };
      state.loading = false;
    },
    clearUser(state) {
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(autoSignInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(autoSignInAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const { displayName, email, uid, phoneNumber, photoURL } = action.payload;
          state.user = {
            displayName,
            email,
            uid,
            phoneNumber,
            photoURL
          };
          state.loading = false;
        }
      })
      .addCase(autoSignInAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        const { displayName, email, uid, phoneNumber, photoURL } = action.payload;
        state.user = {
          displayName,
          email,
          uid,
          phoneNumber,
          photoURL
        };
        state.loading = false;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        const { displayName, email, uid, phoneNumber, photoURL } = action.payload;
        state.user = {
          displayName,
          email,
          uid,
          phoneNumber,
          photoURL
        };
        state.loading = false;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser, clearError } = authSlice.actions;
export default authSlice.reducer;
