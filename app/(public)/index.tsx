import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import styled from 'styled-components';
import Input from '@/components/forms/Input';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { Colors } from '@/constants/Colors';
import useAuth from '@/hooks/auth/useAuth';

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

const RememberMeWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const NoAccountWrapper = styled(View)`
  margin-top: 12px;
  align-items: center;
  gap: 5px;
  justify-content: center;
`;

const RegisterLink = styled(Link)`
  text-decoration: underline;
  text-decoration-color: ${Colors.light.primaryRed};
  color: ${Colors.light.primaryRed};
`;

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { signIn, loading } = useAuth();

  const handleLogin = async () => {
    await signIn({ email, password });
  };

  return (
    <Container>
      <LogoWrapper />
      <FormWrapper>
        <View>
          <Input placeholder="Email" value={email} onChangeText={setEmail} />
          <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <RememberMeWrapper>
            <Text>Remember me</Text>
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              color={rememberMe ? Colors.light.primaryRed : undefined}
            />
          </RememberMeWrapper>
        </View>
        <View>
          <PrimaryButton title="Login" onPress={handleLogin} loading={loading} />
          <NoAccountWrapper>
            <Text>Do not have an account yet?</Text>
            <RegisterLink href="/(public)/register">Register</RegisterLink>
          </NoAccountWrapper>
        </View>
      </FormWrapper>
    </Container>
  );
};

export default Login;
