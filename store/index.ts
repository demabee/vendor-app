import auth from '@/slices/auth';
import orders from '@/slices/orders';
import earnings from '@/slices/earnings';
import wallet from '@/slices/wallet';
import users from '@/slices/users';
import attachments from '@/slices/attachments';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth,
    orders,
    earnings,
    wallet,
    users,
    attachments
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;