import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import AgencyProfileScreen from '../AgencyProfileScreen';
import AgencyNotificationScreen from '../AgencyNotificationScreen';
import AgencyChatScreen from './AgencyChatScreen';

const Tab = createBottomTabNavigator();

function AgencyTabNavigator() {
  return (
    <Tab.Navigator 
      initialRouteName='AgencyProfileScreen'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent = Feather;

          if (route.name === 'AgencyProfileScreen') {
            iconName = 'user';
          } else if (route.name === 'AgencyNotificationScreen') {
            IconComponent = MaterialCommunityIcon;
            iconName = focused ? 'bell' : 'bell-outline';
          } else if (route.name === 'AgencyChatScreen') {
            iconName = 'message-circle';
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F9864A',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name='AgencyProfileScreen'
        component={AgencyProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Tab.Screen 
        name='AgencyNotificationScreen'
        component={AgencyNotificationScreen}
        options={{ title: 'Notifications' }}
      />
      <Tab.Screen 
        name='AgencyChatScreen'
        component={AgencyChatScreen}
        options={{ title: 'Chat' }}
      />
    </Tab.Navigator>
  );
}

export default AgencyTabNavigator;
