import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, query, collection, where, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';
import { Earning } from '@/utils/types';

interface EarningsState {
  paid: Earning[] | null;
  unpaid: Earning[] | null;
  specificEarning: Earning | null;
  loading: boolean;
  error: string | null;
}

const initialState: EarningsState = {
  paid: null,
  unpaid: null,
  specificEarning: null,
  loading: false,
  error: null,
};

export const fetchPaidEarningsThunk = createAsyncThunk(
  'earnings/fetchPaidEarningsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(firestore, 'earnings'), where('status', '==', 'paid'));
      const querySnapshot = await getDocs(q);
      const earnings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Earning));
      return earnings;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUnpaidEarningsThunk = createAsyncThunk(
  'earnings/fetchUnpaidEarningsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(firestore, 'earnings'), where('status', '==', 'unpaid'));
      const querySnapshot = await getDocs(q);
      const earnings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Earning));
      return earnings;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


const earningsSlice = createSlice({
  name: 'earnings',
  initialState,
  reducers: {
    clearEarningsState: () => initialState,
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaidEarningsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaidEarningsThunk.fulfilled, (state, action) => {
        state.paid = action.payload;
        state.loading = false;
      })
      .addCase(fetchPaidEarningsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUnpaidEarningsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnpaidEarningsThunk.fulfilled, (state, action) => {
        state.unpaid = action.payload;
        state.loading = false;
      })
      .addCase(fetchUnpaidEarningsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      ;
  },
});

export const { clearEarningsState, clearError } = earningsSlice.actions;
export default earningsSlice.reducer;