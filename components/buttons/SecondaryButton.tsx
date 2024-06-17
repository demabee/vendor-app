// src/components/PrimaryButton.tsx
import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Colors } from '@/constants/Colors';

type Props = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
};

const StyledTouchableOpacity = styled(TouchableOpacity)`
  height: 40px;
  background-color: ${Colors.light.orange};
  border-color: ${Colors.light.orange};
  border-width: 1px;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 12px;
`;

const SecondaryButton: React.FC<Props> = ({ title, loading, ...props }) => {
  return (
    <StyledTouchableOpacity {...props}>
      {loading ? (
        <ActivityIndicator animating={true} color="white" />
      ) : (
        <ButtonText>{title}</ButtonText>
      )}
    </StyledTouchableOpacity>
  );
};

export default SecondaryButton;
