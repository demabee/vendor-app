import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import useOrders from '@/hooks/useOrders';

const Container = styled(View)`
  padding: 30px;
  justify-content: space-between;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  text-transform: uppercase;
`;

const Description = styled(Text)`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: left;
`;

const ButtonContainer = styled(View)`
  justify-content: center;
`;

export default function AcceptOrderModal({ orderId, onCancel }: { orderId: string, onCancel: () => void }) {
  const { acceptOrder, loading } = useOrders();

  const handleAccept = () => {
    acceptOrder(orderId);
    onCancel();
  };

  return (
    <Container>
      <Title>Order Confirmation</Title>
      <View>
        <Description>Do you want to accept the order?</Description>
      </View>
      <ButtonContainer>
        <PrimaryButton title="Yes" onPress={handleAccept} />
        <SecondaryButton title="No" onPress={onCancel} />
      </ButtonContainer>
      <StatusBar style="light" />
    </Container>
  );
}
