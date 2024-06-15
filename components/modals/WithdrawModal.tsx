import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import useWallet from '@/hooks/useWallet';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ModalInput from '../forms/ModalInput';

const Container = styled(View)`
  padding: 10px;
  justify-content: space-between;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const Description = styled(Text)`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: left;
`;

const ButtonContainer = styled(View)`
  justify-content: center;
`;

export default function WithdrawModal() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [amount, setAmount] = useState<number>(0);
  const { withdrawWallet, error } = useWallet();

  const handleWithdraw = async () => {
    try {
      if (user.uid && amount > 0) {
        withdrawWallet(user.uid, amount);
      }
    } catch (error) {
      console.error('Withdrawal failed:', error);
    } finally {
      router.back();
    }
  };

  const handleCancel = () => {
    router.back();
  }

  return (
    <Container>
      <Title>Withdraw</Title>
      <View>
        <ModalInput
          placeholder="Enter amount..."
          value={amount.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setAmount(Number(text))}
        />
      </View>
      <ButtonContainer>
        <PrimaryButton title="Withdraw" onPress={handleWithdraw} />
        <SecondaryButton title="Cancel" onPress={handleCancel} />
      </ButtonContainer>
      <StatusBar style="light" />
    </Container>
  );
}
