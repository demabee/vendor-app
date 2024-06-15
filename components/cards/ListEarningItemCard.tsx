import { Image, Text, View } from 'react-native'
import React from 'react'
import styled from 'styled-components';
import moment from 'moment';
import { Colors } from '@/constants/Colors';
import { Earning } from '@/utils/types';
import Badge from '../badge/Badge';


const EarningsItem = styled(View)`
  padding: 20px;
  border-radius: 10px;
  border-left-width: 4px;
  border-left-color: red;
  background: ${Colors.light.white};
  shadow-opacity: 0.5;
  shadow-radius: 2px;
  shadow-color: ${Colors.light.mediumGray};
  shadow-offset: 0px 3px;
`;

const EarningsContent = styled(View)`
  margin-bottom: 5px;
`;

const CenterStyle = styled(View)`
  justify-content: center;
  align-items: center;
`;

const FlexBetween = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const EarningsName = styled(Text)`
  font-size: 15px;
  font-weight: 500;
`;

const EarningsDate = styled(Text)`
  font-size: 16px;
  font-weight: 500;
`;

const UserDetails = styled(View)`
  flex-direction: row;
  gap: 8px;
`;

const UserName = styled(Text)`
  font-size: 16px;
  font-weight: 700;
`;

const StyledImage = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border-width: 2px;
  border-color: ${Colors.light.orange};
`;

const ListEarningItemCard = ({ item }: { item: Earning }) => {
  return (
    <EarningsItem>
      <EarningsContent>
        <UserDetails>
          <CenterStyle>
            <StyledImage src={item.profilePicture ?? "https://picsum.photos/200/300"} />
          </CenterStyle>
          <View style={{ flex: 1 }}>
            <UserName>{`${item.customerName}`}</UserName>
            <EarningsName>{`$${item.totalPrice.toFixed(2)}`}</EarningsName>
            <FlexBetween style={{ marginTop: 8 }}>
              <View>
                <Text>Completed</Text>
                <EarningsDate>{moment(item.orderDate.toDate()).format('MMM DD, YYYY')}</EarningsDate>
              </View>
              <Badge type={item.status}>
                {item.status}
              </Badge>
            </FlexBetween>
          </View>
        </UserDetails>
      </EarningsContent>
    </EarningsItem>
  );
};

export default ListEarningItemCard;
