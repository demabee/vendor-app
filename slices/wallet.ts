import { firestore } from '@/firebase';
import { WalletDocData, WithdrawalData } from '@/utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DocumentSnapshot, addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

interface WalletState {
  wallet: WalletDocData | null;
  loading: boolean;
  error: string | null;
}

type UserWalletDocSnap = DocumentSnapshot<WalletDocData>;

const initialState: WalletState = {
  wallet: null,
  loading: false,
  error: null,
};

export const fetchWalletThunk = createAsyncThunk(
  'wallet/fetchWalletThunk',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userDocRef = doc(firestore, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        throw new Error('User document not found');
      }

      const userWalletRef = userDocSnap.data().wallet;
      const userWalletDocSnap: UserWalletDocSnap = await getDoc(userWalletRef);

      if (!userWalletDocSnap.exists()) {
        throw new Error('User wallet document not found');
      }

      const walletData = { id: userWalletDocSnap.id, ...userWalletDocSnap.data() } as WalletDocData;

      return walletData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const withdrawWalletThunk = createAsyncThunk(
  'wallet/withdrawWalletThunk',
  async ({ userId, amount }: { userId: string, amount: number }, { rejectWithValue }) => {
    try {
      const userDocRef = doc(firestore, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        throw new Error('User document not found');
      }

      const userWalletRef = userDocSnap.data().wallet;
      const userWalletDocSnap: UserWalletDocSnap = await getDoc(userWalletRef);

      if (!userWalletDocSnap.exists()) {
        throw new Error('User wallet document not found');
      }

      const walletData = userWalletDocSnap.data() as WalletDocData;
      if (walletData.balance < amount) {
        throw new Error('Insufficient balance');
      }

      const newBalance = walletData.balance - amount;
      await updateDoc(userWalletRef, { balance: newBalance });

      const withdrawalData: WithdrawalData = {
        userId,
        amount,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(firestore, 'withdrawalHistory'), withdrawalData);

      return { ...walletData, balance: newBalance };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateThresholdThunk = createAsyncThunk(
  'wallet/updateThresholdThunk',
  async ({ userId, amount }: { userId: string, amount: number }, { rejectWithValue, dispatch }) => {
    try {
      const userDocRef = doc(firestore, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        throw new Error('User document not found');
      }

      const userWalletRef = userDocSnap.data().wallet;
      const userWalletDocSnap: UserWalletDocSnap = await getDoc(userWalletRef);

      if (!userWalletDocSnap.exists()) {
        throw new Error('User wallet document not found');
      }

      userWalletDocSnap.data() as WalletDocData;
      await updateDoc(userWalletRef, { threshold: amount });
      dispatch(fetchWalletThunk(userId));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const setupWalletThunk = createAsyncThunk(
  'wallet/setupWalletThunk',
  async ({ userId }: { userId: string; }, { rejectWithValue }) => {
    try {
      const walletRef = await addDoc(collection(firestore, 'wallets'), { balance: 0, threshold: 0 });
      const walletDoc = await getDoc(walletRef);
      if (!walletDoc.exists()) {
        throw new Error('Wallet document not found');
      }
      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, { wallet: walletRef });

      const walletData = { ...walletDoc.data() } as WalletDocData;
      return walletData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    clearWalletState: () => initialState,
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletThunk.fulfilled, (state, action) => {
        state.wallet = action.payload;
        state.loading = false;
      })
      .addCase(fetchWalletThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(withdrawWalletThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawWalletThunk.fulfilled, (state, action) => {
        state.wallet = action.payload;
        state.loading = false;
      })
      .addCase(withdrawWalletThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateThresholdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateThresholdThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateThresholdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(setupWalletThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setupWalletThunk.fulfilled, (state, action) => {
        state.wallet = action.payload;
        state.loading = false;
      })
      .addCase(setupWalletThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      ;
  },
});

export const { clearWalletState, clearError } = walletSlice.actions;
export default walletSlice.reducer;