import PrimaryButton from '@/components/buttons/PrimaryButton';
import Card from '@/components/cards/Card';
import Input from '@/components/forms/Input';
import UploadImage from '@/components/forms/UploadImage';
import { Colors } from '@/constants/Colors';
import { seedEarningsCollection, seedOrdersCollection, seedWalletBalance, updateOrdersItemArray } from '@/helpers/create_dummy_data';
import useAttachments from '@/hooks/useAttachments';
import useOrders from '@/hooks/useOrders';
import useUsers from '@/hooks/useUsers';
import useWallet from '@/hooks/useWallet';
import { RootState } from '@/store';
import { UserFormType } from '@/utils/types';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const Container = styled(ScrollView)`
  padding: 30px;
  gap: 15px;
`;

const RowContainer = styled(View)`
  flex-direction: row;
  gap: 10px;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;
`;

const SeederItemWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SeederItemText = styled(Text)`
  font-size: 15px;
  font-weight: bold;
`;

const ImageContainer = styled(View)`
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const FormLabel = styled(Text)`
  font-size: 16px;
  color: ${Colors.dark.darkRed};
  font-weight: bold;
  margin-bottom: 8px;
`;

const Divider = styled(View)`
  border-bottom-color: ${Colors.dark.black};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  margin: 15px 0;
`;

const Settings = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userForm, setUserForm] = useState<UserFormType>({
    displayName: '',
    email: '',
    phoneNumber: '',
    profilePicture: ''
  });
  const { specificUser } = useSelector((state: RootState) => state.users);
  const { loading: loadingUser, updateSpecificUser } = useUsers();
  const { fetchAllActiveOrders, fetchAllPendingOrders } = useOrders();
  const { profilePicture, uploadProfilePicture } = useAttachments();
  const { fetchWallet } = useWallet();

  const isFormValid = useMemo(() => {
    return userForm.displayName && userForm.email && userForm.phoneNumber && userForm.profilePicture;
  }, [userForm]);

  const handleCollectionSeed = async (name: string) => {
    switch (name) {
      case 'orders':
        try {
          setLoading(true);
          await seedOrdersCollection();
        } catch (e) {
          console.error(e)
        } finally {
          fetchAllPendingOrders();
          fetchAllActiveOrders();
          Alert.alert('Seeded orders collection successfully');
          setLoading(false);
        }
        break;
      case 'earnings':
        try {
          setLoading(true);
          await seedEarningsCollection();
        } catch (e) {
          console.error(e)
        } finally {
          Alert.alert('Seeded earnings collection successfully');
          setLoading(false);
        }
        break;
      default:
    }
  };

  const handleUpdateOrderItems = async () => {
    try {
      setLoading(true);
      await updateOrdersItemArray();
    } catch (e) {
      console.error(e)
    } finally {
      Alert.alert('Updated order items successfully');
      setLoading(false);
    }
  };

  const handleRefillBalance = async () => {
    try {
      setLoading(true);
      specificUser && await seedWalletBalance(specificUser?.id);
    } catch (e) {
      console.error(e)
    } finally {
      specificUser && fetchWallet(specificUser.id);
      Alert.alert('Balance Replenished');
      setLoading(false);
    }
  }

  const handleUpload = (uri: string) => {
    setUserForm((prev: UserFormType) => ({
      ...prev,
      profilePicture: uri
    }));
  };

  const setFormData = (key: string, value: string) => {
    setUserForm((prev: UserFormType) => ({
      ...prev,
      [key]: value
    }));
  };

  const onSubmitForm = async () => {
    try {
      if (specificUser) {
        const { profilePicture, ...updatedUser } = userForm;
        if (userForm.profilePicture) {
          uploadProfilePicture(userForm.profilePicture, specificUser.id)
        }
        updateSpecificUser(updatedUser, specificUser.id);
      }
    } catch (error) {
      console.error('Update User Error:', error);
    }
  };

  useEffect(() => {
    if (specificUser) {
      setUserForm({
        displayName: specificUser.displayName ?? '',
        email: specificUser.email ?? '',
        phoneNumber: specificUser.phoneNumber ?? '',
        profilePicture: ''
      });
    }
  }, [specificUser]);

  return (
    <Container contentContainerStyle={styles.ScrollViewStyle}>
      <Card title="Edit Profile" headerShown>
        <ImageContainer>
          <UploadImage
            image={userForm.profilePicture !== '' ? userForm.profilePicture : profilePicture}
            setImage={handleUpload}
          />
        </ImageContainer>
        <FormLabel>Fullname</FormLabel>
        <Input
          value={userForm.displayName}
          onChangeText={(value) => setFormData('displayName', value)}
          keyboardType="default"
          placeholder="Fullname"
          defaultValue={specificUser?.displayName ?? ''}
        />
        <FormLabel>Email</FormLabel>
        <Input
          value={userForm.email}
          onChangeText={(value) => setFormData('email', value)}
          keyboardType="email-address"
          placeholder="Email"
          defaultValue={specificUser?.email ?? ''}
        />
        <FormLabel>Phone number</FormLabel>
        <Input
          value={userForm.phoneNumber}
          onChangeText={(value) => setFormData('phoneNumber', value)}
          keyboardType="default"
          placeholder="Phone number"
          defaultValue={specificUser?.phoneNumber ?? ''}
        />
        <PrimaryButton loading={loadingUser} onPress={onSubmitForm} title="Update" disabled={!isFormValid} />
      </Card>
      <Title>Automation</Title>
      <RowContainer>
        <Card title="Seeders" headerShown>
          <SeederItemWrapper>
            <SeederItemText>Earnings</SeederItemText>
            <PrimaryButton onPress={() => handleCollectionSeed('earnings')} title="Seed" loading={loading} disabled={loading} />
          </SeederItemWrapper>
          <SeederItemWrapper>
            <SeederItemText>Orders</SeederItemText>
            <PrimaryButton onPress={() => handleCollectionSeed('orders')} title="Seed" loading={loading} disabled={loading} />
          </SeederItemWrapper>
        </Card>
        <Card title="Modifiers" headerShown>
          <SeederItemWrapper>
            <SeederItemText>Order Items</SeederItemText>
            <PrimaryButton onPress={handleUpdateOrderItems} title="Update" loading={loading} disabled={loading} />
          </SeederItemWrapper>
        </Card>
      </RowContainer>
      <Card title="Wallet" headerShown>
        <SeederItemWrapper>
          <SeederItemText>Refill Balance (500)</SeederItemText>
          <PrimaryButton onPress={handleRefillBalance} title="Refill" loading={loading} disabled={loading} />
        </SeederItemWrapper>
      </Card>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  ScrollViewStyle: {
    // flex: 1,
    paddingBottom: 90,
    justifyContent: 'center',
    gap: 10
  }
})
