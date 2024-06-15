import PrimaryButton from '@/components/buttons/PrimaryButton';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Tabs, router } from 'expo-router';
import { Text, View } from 'react-native';
import styled from 'styled-components';

const StyledLabel = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
`;

export default function TabLayout() {
  return (
    <Tabs initialRouteName='earnings'>
      <Tabs.Screen
        name='earnings'
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="dollar-sign" size={16} color={color} />
          ),
          tabBarLabel: (({ color, children }) => (
            <StyledLabel style={{ color }}>{children}</StyledLabel>
          )),
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.dark.darkRed,
            paddingTop: 10
          },
          tabBarActiveTintColor: Colors.light.white,
          tabBarInactiveTintColor: Colors.dark.black
        }}
      />
      <Tabs.Screen
        name='orders'
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={24} color={color} />
          ),
          tabBarLabel: (({ color, children }) => (
            <StyledLabel style={{ color }}>{children}</StyledLabel>
          )),
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.dark.darkRed,
            paddingTop: 10
          },
          tabBarActiveTintColor: Colors.light.white,
          tabBarInactiveTintColor: Colors.dark.black
        }}
      />
      <Tabs.Screen redirect name="index" options={{ headerShown: false }} />
      {/* just to hide the index route */}
      {/* current bug with expo router: https://github.com/expo/router/issues/763  */}
    </Tabs>
  );
}
