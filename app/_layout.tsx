import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from '@/store';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const segments = useSegments();
  const router = useRouter();

  const inTabsGroup = segments[0] === '(auth)';
  console.log('user', user);

  useEffect(() => {
    if (!user && !inTabsGroup) {
    } else {
      router.replace('/(public)');
    }
  }, []);

  return <Slot />;
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <InitialLayout />
    </Provider>
  );
}
