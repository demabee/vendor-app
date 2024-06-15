import ListOrderItemCard from '@/components/cards/ListOrderItemCard';
import AcceptOrderModal from '@/components/modals/AcceptOrderModal';
import useOrders from '@/hooks/useOrders';
import { Order } from '@/utils/types';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

const OrderSummary = () => {
  const acceptOrderModalRef = useRef<BottomSheetModal>(null);
  const acceptOrderModalSnapPoints = useMemo(() => ['30%'], []);
  const [idToAccept, setIdToAccept] = useState<string>('');
  const { pendingOrders, activeOrders, fetchAllActiveOrders, fetchAllPendingOrders, loading } = useOrders();

  const onItemView = (id: string) => {
    router.push({ pathname: '/orders/order-view', params: { id } });
  };

  const onAcceptModal = (id: string) => {
    setIdToAccept(id);
    acceptOrderModalRef.current?.present();
  };

  const onDismissModal = () => {
    acceptOrderModalRef.current?.dismiss();
    setIdToAccept('');
  };

  useEffect(() => {
    (async () => {
      await Promise.all([
        fetchAllActiveOrders(),
        fetchAllPendingOrders()
      ])
    })()
  }, []);

  return (
    <>
      <FlatList
        data={[...pendingOrders ?? [], ...activeOrders ?? []]}
        contentContainerStyle={styles.FlatListContentStyle}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Order }) => (
          <ListOrderItemCard
            item={item}
            onPress={() => onItemView(item.id.toString())}
            onAcceptModal={onAcceptModal}
            loading={loading}
          />
        )}
      />
      <BottomSheetModal
        keyboardBehavior='interactive'
        ref={acceptOrderModalRef}
        index={0}
        snapPoints={acceptOrderModalSnapPoints}
      >
        <BottomSheetView style={styles.bottomSheetStyle}>
          <AcceptOrderModal
            orderId={idToAccept}
            onCancel={onDismissModal}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  FlatListContentStyle: {
    padding: 30,
    gap: 15,
  },
  bottomSheetStyle: {
    flex: 1
  }
})
