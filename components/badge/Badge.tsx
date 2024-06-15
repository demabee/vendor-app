import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Colors } from '@/constants/Colors'

type BadgeProps = {
  children?: ReactNode
  style?: ViewStyle
  type?: 'pending' | 'active' | 'cancelled' | 'completed' | 'paid' | 'unpaid'
}

const Container = styled(View)`
  padding: 8px 15px;
  border-radius: 50%;
  width: auto;
`;

const StyledText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const Badge: React.FC<BadgeProps> = ({ children, style, type }) => {
  const statusColor = () => {
    switch (type) {
      case 'pending':
        return {
          background: Colors.light.orange,
          text: Colors.light.white
        }
      case 'active':
        return {
          background: Colors.light.primaryRed,
          text: Colors.light.white
        }
      case 'cancelled':
        return {
          background: Colors.dark.darkGray,
          text: Colors.light.white
        }
      case 'completed':
        return {
          background: Colors.light.lightRed,
          text: Colors.dark.black
        }
      case 'paid':
        return {
          background: Colors.light.primaryRed,
          text: Colors.light.white
        }
      case 'unpaid':
        return {
          background: Colors.light.lightGray,
          text: Colors.dark.black
        }
      default:
        return {
          background: Colors.light.lightGray,
          text: Colors.light.white
        }
    }
  };

  return (
    <Container style={[styles.containerStyle, { backgroundColor: statusColor().background, ...style },]}>
      <StyledText style={{ color: statusColor().text }}>{children}</StyledText>
    </Container>
  )
}

export default Badge

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
  }
})