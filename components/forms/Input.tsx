import { Colors } from '@/constants/Colors';
import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styled from 'styled-components';

type Props = TextInputProps & {
  // Add any additional custom props here if needed
};

const StyledTextInput = styled(TextInput)`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 4px;
  background: ${Colors.light.white};
`;

const Input: React.FC<Props> = (props) => {
  return (
    <StyledTextInput
      {...props}
      placeholderTextColor={Colors.dark.black}
    />
  )
}

export default Input