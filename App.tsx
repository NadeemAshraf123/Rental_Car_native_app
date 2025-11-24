import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './src/screens/home/HomeScreen';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import AuthyVerificationScreen from './src/screens/AuthyVerificationScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import BottomTabs from './src/bottomtabBar/BottomTabs';
import CustomDrawerContent from './src/screens/drawer/CustomDrawerContent';
import EditProfile from './src/screens/profile/EditProfileScreen';
import ProfileNotificationScreen from './src/screens/profile/ProfileNotificationScreen';
import LanguageScreen from './src/screens/profile/LanguageScreen';
import PrivacyPolicyScreen from './src/screens/profile/PrivacyPolicyScreen';
import CarsDetailScreen from './src/screens/carsScreens/CarsDetailScreen';
import TimeSelectingScreen from './src/screens/timeSelectingSecreen/TimeSelectingScreen';
import BookingScreen from './src/screens/bookingScreen/BookingScreen';
import OurAgencyCarsScreen from './src/screens/agency/OurAgencyCarsScreen';
import RatingScreen from './src/screens/ratingScreens/RatingScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false,
        drawerStyle: {
      width: 240,
    },
  }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}

    >
      <Drawer.Screen name="Tabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
}


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{flex: 1,}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: isDarkMode ? '#000' : '#fff'},
          }}>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Home" component={DrawerNavigator} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

          <Stack.Screen name="EditProfile" component={ EditProfile  } />
          <Stack.Screen name="ProfileNotificationScreen" component={ ProfileNotificationScreen  } />
          <Stack.Screen name="LanguageScreen" component={ LanguageScreen  } />
          <Stack.Screen name="PrivacyPolicyScreen" component={ PrivacyPolicyScreen  } />


          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="AuthyVerificationScreen"
            component={AuthyVerificationScreen}
          />
          <Stack.Screen
            name="NewPasswordScreen"
            component={NewPasswordScreen}
          />

          <Stack.Screen name="CarsDetailScreen" component={ CarsDetailScreen  } />
          <Stack.Screen name="TimeSelectingScreen" component={ TimeSelectingScreen  } />
          <Stack.Screen name="BookingScreen" component={ BookingScreen  } />
          <Stack.Screen name="OurAgencyCarsScreen" component={ OurAgencyCarsScreen  } />
          <Stack.Screen name="RatingScreen" component={ RatingScreen  } />



        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
