import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {createMMKV} from 'react-native-mmkv';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

export const storage = createMMKV();
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {AgencyDrawerNavigator} from './src/screens/agency/agencydrawer/AgencyDrawerNavigator';
import  AgencyDrawerNavigator  from './src/screens/agency/agencydrawer/AgencyDrawerNavigator';
import Home from './src/screens/home/HomeScreen';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import AuthyVerificationScreen from './src/screens/AuthyVerificationScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import BottomTabs from './src/tabnavigation/BottomTabs';
import UserDrawer from './src/screens/userdrawer/UserDrawer';
import EditProfile from './src/screens/profile/EditProfileScreen';
import ProfileNotificationScreen from './src/screens/profile/ProfileNotificationScreen';
import LanguageScreen from './src/screens/profile/LanguageScreen';
import PrivacyPolicyScreen from './src/screens/profile/PrivacyPolicyScreen';
import CarsDetailScreen from './src/screens/carsScreens/CarsDetailScreen';
import TimeSelectingScreen from './src/screens/timeSelectingSecreen/TimeSelectingScreen';
import BookingScreen from './src/screens/bookingScreen/BookingScreen';
import OurAgencyCarsScreen from './src/screens/agency/OurAgencyCarsScreen';
import RatingScreen from './src/screens/ratingScreens/RatingScreen';
import InviteFriendsScreen from './src/screens/ratingScreens/InviteFriendsScreen';
import SearchFriends from './src/screens/ratingScreens/SearchFriends';
import SearchInviteFriends from './src/screens/ratingScreens/SearchInviteFriends';
import HomeScreen from './src/screens/home/HomeScreen';
// import EditAgencyProfile from './src/agencySide/EditAgencyProfileNotAllowed';
import AgencyNotificationScreen from './src/agencySide/AgencyNotificationScreen';
import AgencyCarDetailScreen from './src/agencySide/AgencyCarDetailScreen';
import AgencyProfileScreen from './src/agencySide/AgencyProfileScreen';
import AgencyTabNavigator from './src/agencySide/agencyTabNavigator/AgencyTabNavigator';
import CarsDetailView from './src/screens/home/CarsDetailView';
import AddNewCarScreen from './src/agencySide/addagencycars/AddNewCarScreen';
import AgencyRegistrationScreen from './src/agencySide/AgencyRegistrationScreen';
import EditAgencyProfileScreen from './src/agencySide/EditAgencyProfileScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
type UserRole = 'owner' | 'Agency';

function UserDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 240,
        },
      }}
      drawerContent={props => <UserDrawer {...props} />}>
      <Drawer.Screen name="Tabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [userRole, setUserRole] = useState<UserRole>('userRole');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialRole = storage.getString('userRole') as UserRole;
    if (initialRole) {
      setUserRole(initialRole);
    }
    setIsLoading(false);

    const subscription = storage.addOnValueChangedListener((key: any) => {
      const newRole = storage.getString('userRole') as UserRole;
      if (newRole) {
        setUserRole(newRole);
      }
    });

    return () => subscription.remove();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F9864A" />
      </View>
    );
  }

  const RoleBasedRootNavigator = () => {
    if (userRole === 'Agency') {
      return (
        <Stack.Navigator
          initialRouteName="AgencyRegistrationScreen"
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: isDarkMode ? '#000' : '#fff'},
          }}>
          <Stack.Screen
            name="AgencyRegistrationScreen"
            component={AgencyRegistrationScreen}
          />
          <Stack.Screen name="AgencyDrawer" component={AgencyDrawerNavigator} />

          <Stack.Screen
            name="EditAgencyProfileScreen"
            component={EditAgencyProfileScreen}
          />
          <Stack.Screen
            name="AgencyNotificationScreen"
            component={AgencyNotificationScreen}
          />
          <Stack.Screen
            name="AgencyCarDetailScreen"
            component={AgencyCarDetailScreen}
          />
          <Stack.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
          />
          <Stack.Screen
            name="AddNewCarScreen"
            component={AddNewCarScreen}
            options={{title: 'Add New Car'}}
          />
        </Stack.Navigator>
      );
    }

    return (
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: isDarkMode ? '#000' : '#fff'},
        }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="AuthyVerificationScreen"
          component={AuthyVerificationScreen}
        />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />

        <Stack.Screen name="Home" component={UserDrawerNavigator} />

        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen
          name="ProfileNotificationScreen"
          component={ProfileNotificationScreen}
        />
        <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
        />
        <Stack.Screen name="CarsDetailScreen" component={CarsDetailScreen} />
        <Stack.Screen
          name="TimeSelectingScreen"
          component={TimeSelectingScreen}
        />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen
          name="OurAgencyCarsScreen"
          component={OurAgencyCarsScreen}
        />
        <Stack.Screen name="RatingScreen" component={RatingScreen} />
        <Stack.Screen
          name="InviteFriendsScreen"
          component={InviteFriendsScreen}
        />
        <Stack.Screen name="SearchFriends" component={SearchFriends} />
        <Stack.Screen
          name="SearchInviteFriends"
          component={SearchInviteFriends}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>{RoleBasedRootNavigator()}</NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
