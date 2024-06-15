import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';
import { Order } from '@/utils/types';

interface OrdersState {
  pending: Order[] | null;
  active: Order[] | null;
  specificOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  pending: null,
  active: null,
  specificOrder: null,
  loading: false,
  error: null,
};

export const fetchPendingOrdersThunk = createAsyncThunk(
  'orders/fetchPendingOrdersThunk',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(firestore, 'orders'), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
      return orders;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchActiveOrdersThunk = createAsyncThunk(
  'orders/fetchActiveOrdersThunk',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(firestore, 'orders'), where('status', '==', 'active'));
      const querySnapshot = await getDocs(q);
      const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
      return orders;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSpecificOrderThunk = createAsyncThunk(
  'orders/fetchSpecificOrderThunk',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const orderRef = doc(firestore, 'orders', orderId);
      const orderDoc = await getDoc(orderRef);
      if (orderDoc.exists()) {
        return { ...orderDoc.data() } as Order;
      } else {
        return rejectWithValue('Order not found');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const acceptOrderThunk = createAsyncThunk(
  'orders/acceptOrderThunk',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const orderRef = doc(collection(firestore, 'orders'), orderId);
      await updateDoc(orderRef, {
        status: 'active',
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrdersState: () => initialState,
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingOrdersThunk.fulfilled, (state, action) => {
        state.pending = action.payload;
        state.loading = false;
      })
      .addCase(fetchPendingOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchActiveOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveOrdersThunk.fulfilled, (state, action) => {
        state.active = action.payload;
        state.loading = false;
      })
      .addCase(fetchActiveOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSpecificOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecificOrderThunk.fulfilled, (state, action) => {
        state.specificOrder = action.payload;
        state.loading = false;
      })
      .addCase(fetchSpecificOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(acceptOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptOrderThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(acceptOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      ;
  },
});

export const { clearOrdersState, clearError } = ordersSlice.actions;
export default ordersSlice.reducer;
