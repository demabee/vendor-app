import { Stack } from 'expo-router'

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  )
}

export default PublicLayout;