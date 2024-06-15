import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { Colors } from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ErrorDialogProps = {
  message: string
  onPress?: () => void;
}

const Container = styled(View)`
  border-width: 1px;
  border-color: ${Colors.dark.darkRed};
  padding: 10px;
  border-radius: 10px;
  background-color: ${Colors.light.lightRed};
`;

const ErrorDialog: React.FC<ErrorDialogProps> = ({ message, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <Text>{message}</Text>
      </Container>
    </TouchableOpacity>
  )
}

export default ErrorDialog

const styles = StyleSheet.create({})