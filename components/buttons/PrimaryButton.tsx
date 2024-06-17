import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Colors } from '@/constants/Colors';

type Props = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
};

const StyledTouchableOpacity = styled(TouchableOpacity) <{ disabled: boolean }>`
  height: 40px;
  background-color: ${({ disabled }) => (disabled ? Colors.light.lightRed : Colors.dark.darkRed)};
  border-color: ${({ disabled }) => (disabled ? Colors.light.lightRed : Colors.dark.darkRed)};
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

const PrimaryButton: React.FC<Props> = ({ title, loading, ...props }) => {
  return (
    <StyledTouchableOpacity {...props} disabled={props.disabled || loading as boolean}>
      {loading ? (
        <ActivityIndicator animating={true} color="white" />
      ) : (
        <ButtonText>{title}</ButtonText>
      )}
    </StyledTouchableOpacity>
  );
};

export default PrimaryButton;
