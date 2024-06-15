import ListOrderItemCard from '@/components/cards/ListOrderItemCard';
import AcceptOrderModal from '@/components/modals/AcceptOrderModal';
import { Colors } from '@/constants/Colors';
import useOrders from '@/hooks/useOrders';
import { Order } from '@/utils/types';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const PendingRoute = () => {
  const acceptOrderModalRef = useRef<BottomSheetModal>(null);
  const acceptOrderModalSnapPoints = useMemo(() => ['30%'], []);
  const [idToAccept, setIdToAccept] = useState<string>('');
  const { pendingOrders, loading, fetchAllPendingOrders } = useOrders();

  const onItemView = (id: string) => {
    router.push({ pathname: '/orders/order-view', params: { id } });
    // router.push({ pathname: '/orders/accept-modal', params: { id } });
  };

  const onAcceptModal = (id: string) => {
    setIdToAccept(id);
    acceptOrderModalRef.current?.present();
  };

  const onDismissModal = () => {
    acceptOrderModalRef.current?.dismiss();
    setIdToAccept('');
  }

  useEffect(() => {
    if (loading) {
      fetchAllPendingOrders();
    }
  }, [loading]);

  return (
    <>
      <FlatList
        data={pendingOrders ?? []}
        renderItem={({ item }: { item: Order }) =>
          <ListOrderItemCard
            item={item}
            onPress={() => onItemView(item.id.toString())}
            onAcceptModal={onAcceptModal}
            loading={loading}
          />
        }
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.FlatListContentStyle}
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
}

const ActiveRoute = () => {
  const { activeOrders, loading, fetchAllActiveOrders } = useOrders();

  const onItemView = (id: string) => {
    router.push({ pathname: '/orders/order-view', params: { id } });
  };

  useEffect(() => {
    if (loading) {
      fetchAllActiveOrders();
    }
  }, [loading]);

  return (
    <FlatList
      data={activeOrders}
      renderItem={({ item }: { item: Order }) =>
        <ListOrderItemCard
          item={item}
          onPress={() => onItemView(item.id.toString())}
        />
      }
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.FlatListContentStyle}
    />
  );
}

const renderScene = SceneMap({
  pending: PendingRoute,
  active: ActiveRoute,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: Colors.light.primaryRed }}
    style={{ backgroundColor: Colors.dark.black }}
    renderLabel={renderLabel}
    activeColor={Colors.light.lightRed}
  />
);

const renderLabel = ({ color, route }: any) => {
  return (
    <Text style={{ color }}>
      {route.title}
    </Text>
  )
};

const Orders = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 'pending', title: 'Pending' },
    { key: 'active', title: 'Active' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default Orders;

const styles = StyleSheet.create({
  FlatListContentStyle: {
    gap: 15,
    padding: 30
  },
  bottomSheetStyle: {
    flex: 1
  }
})