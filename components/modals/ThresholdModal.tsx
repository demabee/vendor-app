import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import styled from 'styled-components/native';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import useWallet from '@/hooks/useWallet';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ModalInput from '../forms/ModalInput';

const Container = styled(View)`
  padding: 30px;
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

export default function ThresholdModal({ onCloseModal }: { onCloseModal: () => void }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [amount, setAmount] = useState<number>(0);
  const { wallet, updateThreshold } = useWallet();

  const handleUpdateThreshold = async () => {
    try {
      if (user.uid && amount > 0) {
        updateThreshold(user.uid, amount);
      }
    } catch (error) {
      console.error('Updating threshold failed:', error);
    } finally {
      onCloseModal();
    }
  };

  const handleCancel = () => {
    onCloseModal();
  };

  useEffect(() => {
    if (wallet) {
      setAmount(wallet.threshold);
    }
  }, [wallet]);

  return (
    <Container>
      <Title>Threshold</Title>
      <View>
        <ModalInput
          placeholder="Enter amount..."
          value={amount.toString()}
          keyboardType="numeric"
          onChangeText={(text: string) => setAmount(Number(text))}
        />
      </View>
      <ButtonContainer>
        <PrimaryButton title="Apply" onPress={handleUpdateThreshold} />
        <SecondaryButton title="Cancel" onPress={handleCancel} />
      </ButtonContainer>
    </Container>
  );
}
