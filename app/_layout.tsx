import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch, RootState } from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { autoSignInAsync } from '@/slices/auth';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkStoredCredentials = async () => {
      const credentials = await AsyncStorage.getItem('userCredentials');
      if (credentials) {
        const { rememberMe } = JSON.parse(credentials);
        if (rememberMe) {
          dispatch(autoSignInAsync());
        }
      }
    };

    checkStoredCredentials();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      router.replace('(auth)');
    } else {
      router.replace('(public)');
    }
  }, [user]);

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <InitialLayout />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
