import CustomDrawerContent from '@/components/navigation/CustomDrawerContent';
import { Colors } from '@/constants/Colors';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ProtectedLayout = () => {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          title: 'Vendo',
          headerStyle: {
            backgroundColor: Colors.dark.darkRed
          },
          headerTitleStyle: {
            color: Colors.light.white
          },
          headerTintColor: Colors.light.white,
          drawerLabelStyle: {
            color: Colors.light.white,
          },
          drawerActiveTintColor: Colors.light.primaryRed,
          drawerActiveBackgroundColor: Colors.light.primaryRed,
        }}
      />
      <Drawer.Screen
        name="order-summary"
        options={{
          drawerLabel: 'Order Summary',
          headerStyle: {
            backgroundColor: Colors.dark.darkRed
          },
          headerTitleStyle: {
            color: Colors.light.white
          },
          headerTintColor: Colors.light.white,
          drawerLabelStyle: {
            color: Colors.light.white,
          },
          drawerActiveTintColor: Colors.light.primaryRed,
          drawerActiveBackgroundColor: Colors.light.primaryRed,
          title: 'Order Summary'
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          headerStyle: {
            backgroundColor: Colors.dark.darkRed
          },
          headerTitleStyle: {
            color: Colors.light.white
          },
          headerTintColor: Colors.light.white,
          drawerLabelStyle: {
            color: Colors.light.white,
          },
          drawerActiveTintColor: Colors.light.primaryRed,
          drawerActiveBackgroundColor: Colors.light.primaryRed,
          title: 'Settings'
        }}
      />
      {/* <Drawer.Screen
        name="help-and-support"
        options={{
          drawerLabel: 'Help and Support',
          headerStyle: {
            backgroundColor: Colors.dark.darkRed
          },
          headerTitleStyle: {
            color: Colors.light.white
          },
          headerTintColor: Colors.light.white,
          drawerLabelStyle: {
            color: Colors.light.white,
          },
          drawerActiveTintColor: Colors.light.primaryRed,
          drawerActiveBackgroundColor: Colors.light.primaryRed,
          title: 'Help and Support'
        }}
      /> */}
    </Drawer>
  )
}

export default ProtectedLayout;