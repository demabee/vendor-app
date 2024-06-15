import useAuth from '@/hooks/auth/useAuth';
import useEarnings from '@/hooks/useEarnings';
import useOrders from '@/hooks/useOrders';
import useUsers from '@/hooks/useUsers';
import useWallet from '@/hooks/useWallet';
import { RootState } from '@/store';
import { Stack } from 'expo-router'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProtectedLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { fetchAllActiveOrders, fetchAllPendingOrders } = useOrders();
  const { fetchAllPaidEarnings, fetchAllUnpaidEarnings } = useEarnings();
  const { fetchWallet } = useWallet();
  const { fetchAllUsers, fetchSpecificUser } = useUsers();

  useEffect(() => {
    (async () => {
      Promise.all([
        fetchAllActiveOrders(),
        fetchAllPendingOrders(),
        fetchAllPaidEarnings(),
        fetchAllUnpaidEarnings(),
        fetchAllUsers(),
      ])
    })();
  }, [
    user,
    fetchAllActiveOrders,
    fetchAllPendingOrders,
    fetchAllPaidEarnings,
    fetchAllUnpaidEarnings,
    fetchWallet
  ]);

  useEffect(() => {
    (async () => {
      if (user) {
        Promise.all([
          fetchWallet(user.uid),
          fetchSpecificUser(user.uid)
        ])
      }
    })()
  }, [user]);
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default ProtectedLayout;