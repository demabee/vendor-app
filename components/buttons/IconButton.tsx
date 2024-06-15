// src/components/PrimaryButton.tsx
import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Colors } from '@/constants/Colors';

type Props = TouchableOpacityProps & {
  icon: ReactNode;
  loading?: boolean;
  btnColor?: string;
};

type StyledTouchableOpacityProps = {
  btnColor?: string
}

const StyledTouchableOpacity = styled(TouchableOpacity) <StyledTouchableOpacityProps>`
  height: 35px;
  width: auto;
  background-color: ${(props) => props.btnColor ?? Colors.dark.darkRed};
  border-color: ${(props) => props.btnColor ?? Colors.dark.darkRed};
  border-width: 1px;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 5px;
`;

const IconButton: React.FC<Props> = ({ icon, loading, btnColor, ...props }) => {
  return (
    <StyledTouchableOpacity btnColor={btnColor} {...props}>
      {loading ? (
        <ActivityIndicator animating={true} color="white" />
      ) : (
        <>
          {icon}
        </>
      )}
    </StyledTouchableOpacity>
  );
};

export default IconButton;
