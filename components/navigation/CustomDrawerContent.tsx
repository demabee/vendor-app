import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import PrimaryButton from '../buttons/PrimaryButton';
import useAuth from '@/hooks/auth/useAuth';
import { Colors } from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import styled from 'styled-components';
import userDefaultPicture from '@/assets/images/user-default.png';

const UserContainer = styled(View)`
  padding: 20px;
`;

const UserDisplayName = styled(Text)`
  color: ${Colors.light.white};
  font-weight: bold;
  font-size: 30px;
  margin-top: 10px;
`;

const StyledImage = styled(Image)`
  width: 150px;
  height: 150px;
  border-width: 4px;
  border-color: ${Colors.dark.darkRed};
  border-radius: 100px;
  margin-top: 20px;
`;

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { specificUser } = useSelector((state: RootState) => state.users);
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    signOut();
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <UserContainer>
        <StyledImage source={specificUser?.profilePicture ? { uri: specificUser?.profilePicture } : userDefaultPicture} />
        <UserDisplayName>{specificUser?.displayName}</UserDisplayName>
      </UserContainer>
      <DrawerItemList
        {...props}
      />
      <View style={styles.signOutButtonContainer}>
        <PrimaryButton title="Sign Out" onPress={handleSignOut} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  signOutButtonContainer: {
    marginTop: 'auto',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.black
  }
});

export default CustomDrawerContent;
