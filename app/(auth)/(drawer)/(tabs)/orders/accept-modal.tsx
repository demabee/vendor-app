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
  height: 30%;
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

export default function AcceptModal() {
  const params = useLocalSearchParams();
  const { acceptOrder, loading } = useOrders();
  const { id } = params;

  const handleAccept = () => {
    acceptOrder(id as string);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  }

  return (
    <Container>
      <Title>Order Confirmation</Title>
      <View>
        <Description>Do you want to accept the order?</Description>
      </View>
      <ButtonContainer>
        <PrimaryButton title="Yes" onPress={handleAccept} />
        <SecondaryButton title="No" onPress={handleCancel} />
      </ButtonContainer>
      <StatusBar style="light" />
    </Container>
  );
}
