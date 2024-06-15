import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Colors } from '@/constants/Colors';

type Props = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
  leftIcon?: ReactNode
};

const StyledTouchableOpacity = styled(TouchableOpacity) <{ disabled: boolean }>`
  height: auto;
  background-color: transparent;
  padding: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 5px;
`;

const ButtonText = styled.Text`
  color: ${Colors.dark.darkGray};
  font-size: 16px;
  font-weight: 500;
`;

const TransparentButton: React.FC<Props> = ({ title, leftIcon, loading, ...props }) => {
  return (
    <StyledTouchableOpacity {...props} disabled={props.disabled || loading as boolean}>
      {loading ? (
        <ActivityIndicator animating={true} color="white" />
      ) : (
        <>
          {leftIcon}
          <ButtonText>{title}</ButtonText>
        </>
      )}
    </StyledTouchableOpacity>
  );
};

export default TransparentButton;
