import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import useOrders from '@/hooks/useOrders';
import styled from 'styled-components';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import { Colors } from '@/constants/Colors';
import Card from '@/components/cards/Card';
import Badge from '@/components/badge/Badge';
import { Feather } from '@expo/vector-icons';
import { OrderItem } from '@/utils/types';
import IconButton from '@/components/buttons/IconButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TransparentButton from '@/components/buttons/TransparentButton';

const Container = styled(ScrollView)`
  flex: 1;
  padding: 20px;
`;

const Wrapper = styled(View)`
  gap: 20px;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.dark.darkRed};
  margin-bottom: 10px;
`;

const UserWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

const DetailWrapper = styled(View)`
  flex-direction: row;
  gap: 5px;
  margin-bottom: 5px;
`;

const DetailLabel = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  color: ${Colors.light.primaryRed};
`;

const DetailText = styled(Text)`
  font-size: 16px;
  color: ${Colors.dark.darkGray};
`;

const DetailTextBold = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  color: ${Colors.light.primaryRed};
`;

const ItemsOrderedWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0;
`;

const ItemsCenter = styled(View)`
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled(View)`
  justify-content: space-between;
`;

const Divider = styled(View)`
  border-bottom-color: ${Colors.dark.black};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  margin: 15px 0;
`;

const StyledImage = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border-width: 2px;
  border-color: ${Colors.light.orange};
`;

const CenterStyle = styled(View)`
  justify-content: center;
  align-items: center;
`;

const TopSection = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const OrderView = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const { fetchSpecificOrder, specificOrder, acceptOrder, loading } = useOrders();

  useEffect(() => {
    if (id) {
      fetchSpecificOrder(id as string);
    }
  }, [id]);

  const handleAccept = () => {
    if (specificOrder?.id) {
      acceptOrder(specificOrder.id.toString());
    }
  };

  const handleDecline = () => {
    if (specificOrder?.id) {
      // declineOrder(specificOrder.id);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Container contentContainerStyle={styles.ScrollViewContentStyle}>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color={Colors.light.primaryRed} />
        </LoadingContainer>
      ) : specificOrder ? (
        <Wrapper>
          <TopSection>
            <TransparentButton
              title="Back"
              onPress={handleBack}
              leftIcon={
                <Feather
                  name="arrow-left-circle"
                  size={20}
                  color={Colors.light.lightGray}
                />
              }
            />
          </TopSection>
          <Card title="User Detail" headerShown>
            <UserWrapper>
              <CenterStyle>
                <StyledImage src={specificOrder.profilePicture ?? "https://picsum.photos/200/300"} />
              </CenterStyle>
              <View>
                <DetailWrapper>
                  <Feather name="user" size={12} color="orange" />
                  <DetailLabel>{specificOrder.customerName}</DetailLabel>
                </DetailWrapper>
                <DetailWrapper>
                  <Feather name="phone" size={12} color="orange" />
                  <DetailText>1-938-461-9205</DetailText>
                </DetailWrapper>
                <DetailWrapper>
                  <Feather name="mail" size={12} color="orange" />
                  <DetailText>{specificOrder.email}</DetailText>
                </DetailWrapper>
              </View>
            </UserWrapper>
          </Card>
          <Card title="Order Summary" headerShown>
            <DetailWrapper>
              <DetailLabel>Order ID:</DetailLabel>
              <DetailText>{specificOrder.id}</DetailText>
            </DetailWrapper>
            <DetailWrapper>
              <ItemsCenter>
                <DetailLabel>Order Status:</DetailLabel>
              </ItemsCenter>
              <Badge type={specificOrder.status}>
                {specificOrder.status}
              </Badge>
            </DetailWrapper>
            <Divider />
            <Title>Items Ordered</Title>
            {specificOrder.items.map((item: OrderItem, index: number) => {
              return (
                <ItemsOrderedWrapper key={`item_${index}`}>
                  <DetailLabel>{item.label}</DetailLabel>
                  <DetailText>${item.price}</DetailText>
                </ItemsOrderedWrapper>
              )
            })}
            <Divider />
            <ItemsOrderedWrapper>
              <DetailLabel>Total:</DetailLabel>
              <DetailTextBold>${specificOrder.totalPrice.toFixed(2)}</DetailTextBold>
            </ItemsOrderedWrapper>
          </Card>
          <Card style={{ flexGrow: 0 }}>
            <ButtonContainer>
              {specificOrder.status === 'pending' ? (
                <>
                  <PrimaryButton title="Accept" onPress={handleAccept} />
                  <SecondaryButton title="Decline" onPress={handleDecline} />
                </>
              ) : (
                <PrimaryButton title="Waiting for Payment" onPress={() => { }} disabled />
              )}
            </ButtonContainer>
          </Card>
        </Wrapper>
      ) : (
        <DetailText>No order found</DetailText>
      )}
    </Container>
  );
};

export default OrderView;

const styles = StyleSheet.create({
  ScrollViewContentStyle: {
    paddingBottom: 40
  }
})