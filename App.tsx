import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer }  from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/HomeScreen';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import AuthyVerificationScreen from './src/screens/AuthyVerificationScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import BottomTabs from './src/bottomtabBar/BottomTabs';


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <NavigationContainer>
      <Stack.Navigator 
          initialRouteName='Landing'
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: isDarkMode ? '#000' : '#fff'},

          }}
            >
       <Stack.Screen name='Landing' component={ LandingScreen  }   />
       <Stack.Screen name='Home' component={BottomTabs} />  
       <Stack.Screen name='LoginScreen'  component={ LoginScreen } />
       <Stack.Screen name='SignUpScreen'  component={ SignUpScreen   } />
       <Stack.Screen name='ForgotPasswordScreen'  component={ ForgotPasswordScreen   } />
       <Stack.Screen name='AuthyVerificationScreen'  component={ AuthyVerificationScreen   } />
       <Stack.Screen name='NewPasswordScreen'  component={ NewPasswordScreen  } />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

