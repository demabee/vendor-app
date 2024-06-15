import { Colors } from '@/constants/Colors';
import React, { ReactNode } from 'react'
import { Text, View, ViewStyle } from 'react-native'
import styled from 'styled-components'

type CardProps = {
  title?: string
  titleColor?: string
  children?: ReactNode
  headerShown?: boolean
  rightIcon?: ReactNode
  leftIcon?: ReactNode
  style?: ViewStyle
}

const Container = styled(View)`
  border-radius: 15px;
  flex: auto;
  background: ${Colors.light.white};
  shadow-opacity: 0.5;
  shadow-radius: 2px;
  shadow-color: ${Colors.light.mediumGray};
  shadow-offset: 0px 3px;
`;

const CardHeader = styled(View)`
  flex-direction: row;
  gap: 8px;
  background: ${Colors.dark.darkRed};
  padding: 15px;
  border-radius: 10px 10px 0 0;
`;

const CardBody = styled(View)`
  padding: 15px;
`;

const StyledText = styled(Text)`
  font-weight: 700;
  font-size: 20px;
  color: ${Colors.light.white};
`;

const Card: React.FC<CardProps> = ({ title, headerShown, leftIcon, rightIcon, children, style }) => {
  return (
    <Container style={{ ...style }}>
      {headerShown && (
        <>
          <CardHeader>
            {leftIcon}
            <StyledText>{title ?? ''}</StyledText>
            {rightIcon}
          </CardHeader>
        </>
      )}
      <CardBody>
        {children}
      </CardBody>
    </Container>
  )
}

export default Card;