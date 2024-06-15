import { ActivityIndicator, FlatList, StyleSheet, Text, View, Modal } from 'react-native';
import styled from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import Card from '@/components/cards/Card';
import { Colors } from '@/constants/Colors';
import { Earning } from '@/utils/types';
import ListEarningItemCard from '@/components/cards/ListEarningItemCard';
import useEarnings from '@/hooks/useEarnings';
import useWallet from '@/hooks/useWallet';
import { useCallback, useMemo, useRef } from 'react';
import { router } from 'expo-router';
import ErrorDialog from '@/components/dialogs/ErrorDialog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ScrollView } from 'react-native-gesture-handler';
import { clearError } from '@/slices/wallet';
import {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import WithdrawModal from '@/components/modals/WithdrawModal';
import ThresholdModal from '@/components/modals/ThresholdModal';

const Container = styled(ScrollView)`
  gap: 10px;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.dark.darkRed};
`;

const BalanceSection = styled(View)`
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const AnalyticsSection = styled(View)`
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
`;

const BigText = styled(Text)`
  font-size: 40px;
  font-weight: 500;
  color: ${Colors.dark.darkRed};
  text-align: center;
`;

const Divider = styled(View)`
  border-bottom-color: ${Colors.dark.black};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  margin: 10px 0;
`;

const Earnings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { wallet, loading: loadingWallet, setupWallet, error } = useWallet();
  const { paidEarnings, unpaidEarnings, loading } = useEarnings();
  const withdrawModalSnapPoints = useMemo(() => ['30%'], []);
  const thresholdModalSnapPoints = useMemo(() => ['30%'], []);
  const withdrawModalRef = useRef<BottomSheetModal>(null);
  const thresholdModalRef = useRef<BottomSheetModal>(null);
  const totalPaidEarningsPrice = (paidEarnings ?? []).reduce((total: number, earning: Earning) => total + earning.totalPrice, 0);
  const totalUnpaidEarningsPrice = (unpaidEarnings ?? []).reduce((total: number, earning: Earning) => total + earning.totalPrice, 0);

  const canWithdraw = useMemo(() => {
    if (wallet) {
      return wallet?.balance > wallet?.threshold;
    }
    return false;
  }, [wallet]);

  const onWithdrawModal = () => {
    withdrawModalRef.current?.present();
  };

  const onThresholdModal = () => {
    thresholdModalRef.current?.present();
  };

  const onSetupWallet = () => {
    setupWallet(user.uid);
  };

  const onClearError = () => {
    dispatch(clearError());
  };

  const renderHeader = () => (
    <Container>
      {!canWithdraw && !loadingWallet && (
        <ErrorDialog
          message="Your balance is below the minimum withdrawal threshold. Please continue earning to reach the minimum amount required for withdrawal."
        />
      )}
      {error && <ErrorDialog message={error} onPress={onClearError} />}
      <BalanceSection>
        <Card
          title="Available Balance"
          headerShown
          leftIcon={
            <FontAwesome
              name="dollar"
              size={20}
              color={Colors.light.white}
            />
          }
        >
          {loadingWallet ? <ActivityIndicator size="large" color={Colors.light.primaryRed} /> : (
            <>
              {wallet ? (
                <BigText>{wallet?.balance ?? 0}</BigText>
              ) : (
                <PrimaryButton onPress={onSetupWallet} title="Setup Wallet" />
              )}
            </>
          )}
        </Card>
        <Card
          title="Earnings"
          headerShown={false}
          leftIcon={
            <FontAwesome
              name="dollar"
              size={20}
              color={Colors.light.white}
            />
          }
        >
          <PrimaryButton onPress={onWithdrawModal} title="Withdraw" disabled={!canWithdraw} />
          <SecondaryButton onPress={onThresholdModal} title="Setup Threshold" />
        </Card>
      </BalanceSection>
      <AnalyticsSection>
        <Card
          title="Paid"
          headerShown
          leftIcon={
            <FontAwesome
              name="money"
              size={20}
              color={Colors.light.white}
            />
          }
        >
          {loading ? <ActivityIndicator size="large" color={Colors.light.primaryRed} /> : (
            <BigText>${totalPaidEarningsPrice}</BigText>
          )}
        </Card>
        <Card
          title="Unpaid"
          headerShown
          leftIcon={
            <FontAwesome
              name="warning"
              size={20}
              color={Colors.light.white}
            />
          }
        >
          {loading ? <ActivityIndicator size="large" color={Colors.light.primaryRed} /> : (
            <BigText>${totalUnpaidEarningsPrice}</BigText>
          )}
        </Card>
      </AnalyticsSection>
      <Title>Earnings</Title>
      <Divider />
    </Container>
  );

  return (
    <>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={[...paidEarnings ?? [], ...unpaidEarnings ?? []]}
        contentContainerStyle={styles.FlatListContentStyle}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Earning }) => <ListEarningItemCard item={item} />}
      />
      <BottomSheetModal
        keyboardBehavior='interactive'
        ref={withdrawModalRef}
        index={0}
        snapPoints={withdrawModalSnapPoints}
      >
        <BottomSheetView style={styles.bottomSheetStyle}>
          <WithdrawModal />
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        keyboardBehavior='interactive'
        ref={thresholdModalRef}
        index={0}
        snapPoints={thresholdModalSnapPoints}
      >
        <BottomSheetView style={styles.bottomSheetStyle}>
          <ThresholdModal />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
};

export default Earnings;

const styles = StyleSheet.create({
  FlatListContentStyle: {
    padding: 30,
    gap: 15,
  },
  bottomSheetStyle: {
    flex: 1
  }
});
