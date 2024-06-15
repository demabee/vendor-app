import { Image, Text, View } from 'react-native'
import React from 'react'
import styled from 'styled-components';
import moment from 'moment';
import { Colors } from '@/constants/Colors';
import { Order } from '@/utils/types';
import IconButton from '../buttons/IconButton';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ListOrderItemCardProps = {
  item: Order
  onPress: () => void
  onAcceptModal?: (id: string) => void
  loading?: boolean
}


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
  gap: 8px;
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
  gap: 15px;
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

const ListOrderItemCard: React.FC<ListOrderItemCardProps> = ({ item, onPress, onAcceptModal, loading }) => {
  return (
    <View>
      <EarningsItem>
        <EarningsContent>
          <UserDetails>
            <CenterStyle>
              <StyledImage src={item.profilePicture ?? "https://picsum.photos/200/300"} />
            </CenterStyle>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <UserName>{`${item.customerName}`}</UserName>
              <EarningsName>{`$${item.totalPrice.toFixed(2)}`}</EarningsName>
              <FlexBetween style={{ marginTop: 10 }}>
                <View>
                  <Text>Requested</Text>
                  <EarningsDate>{moment(item.orderDate.toDate()).format('MMM DD, YYYY')}</EarningsDate>
                </View>
              </FlexBetween>
            </View>
            <View>
              {item.status === 'pending' && (
                <FlexBetween>
                  <IconButton
                    onPress={() => onAcceptModal && onAcceptModal(item.id.toString())}
                    icon={<Feather name="check" size={12} color="white" />}
                    loading={loading}
                  />
                  <IconButton
                    btnColor={Colors.light.lightGray}
                    icon={<Feather name="x" size={12} color="white" />}
                  />
                </FlexBetween>
              )}
              <IconButton
                onPress={onPress}
                btnColor={Colors.light.orange}
                icon={<Feather name="eye" size={12} color="white" />}
              />
            </View>
          </UserDetails>
        </EarningsContent>
      </EarningsItem>
    </View>
  );
};

export default ListOrderItemCard;
