// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import styled from 'styled-components';
import Input from '@/components/forms/Input';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { Colors } from '@/constants/Colors';
import useAuth from '@/hooks/auth/useAuth';
import ErrorDialog from '@/components/dialogs/ErrorDialog';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  background: ${Colors.dark.darkRed};
  gap: 20px;
`;

const LogoWrapper = styled(View)`
  flex: 1;
  background: ${Colors.dark.darkRed};
`;

const FormWrapper = styled(View)`
  flex-grow: 1;
  background: ${Colors.light.white};
  border-radius: 35px;
  padding: 0 16px;
  padding-top: 50px;
`;

const TermsWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const HaveAccountWrapper = styled(View)`
  margin-top: 12px;
  align-items: center;
  gap: 5px;
  justify-content: center;
`;

const LoginLink = styled(Link)`
  text-decoration: underline;
  text-decoration-color: ${Colors.light.primaryRed};
  color: ${Colors.light.primaryRed};
`;

const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const { signUp, loading, error } = useAuth();

  const handleRegister = async () => {
    if (!agreeToTerms) {
      alert("You must agree to the terms and conditions to register.");
      return;
    }
    await signUp({ name, email, phone, password });
  };

  return (
    <Container>
      <LogoWrapper />
      <FormWrapper>
        {error && (
          <ErrorDialog message={error} />
        )}
        <View style={{ marginTop: 10 }}>
          <Input placeholder="Name" value={name} onChangeText={setName} />
          <Input placeholder="Email" value={email} onChangeText={setEmail} />
          <Input placeholder="Phone" value={phone} onChangeText={setPhone} />
          <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <TermsWrapper>
            <Text>Agree to terms and conditions</Text>
            <Checkbox
              value={agreeToTerms}
              onValueChange={setAgreeToTerms}
              color={agreeToTerms ? Colors.light.primaryRed : undefined}
            />
          </TermsWrapper>
        </View>
        <View>
          <PrimaryButton title="Register" onPress={handleRegister} loading={loading} />
          <HaveAccountWrapper>
            <Text>Already have an account?</Text>
            <LoginLink href="/(public)">Login</LoginLink>
          </HaveAccountWrapper>
        </View>
      </FormWrapper>
    </Container>
  );
};

export default Register;
