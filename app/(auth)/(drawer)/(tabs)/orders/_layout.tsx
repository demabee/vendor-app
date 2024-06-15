import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="order-view" options={{}} />
      <Stack.Screen
        name="accept-modal"
        options={{
          presentation: 'modal',
          contentStyle: {
            top: '70%',
            flex: 1,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }
        }}
      />
    </Stack>
  )
};