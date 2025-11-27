import React from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import homeIcon from './../../assets/agencyreistration/agencyBottomTab/homeIcon.png';
import bellIcon from './../../assets/agencyreistration/agencyBottomTab/bellIcon.png';
import sendIcon from './../../assets/agencyreistration/agencyBottomTab/sendIcon.png';
import activeBg from './../../assets/agencyreistration/agencyBottomTab/activeBg.png';

import AgencyProfileScreen from '../AgencyProfileScreen';
import AgencyNotificationScreen from '../AgencyNotificationScreen';
import AgencyChatScreen from './AgencyChatScreen';

const Tab = createBottomTabNavigator();

function AgencyTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="AgencyProfileScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconSource = null;

          if (route.name === 'AgencyProfileScreen') iconSource = homeIcon;
          if (route.name === 'AgencyNotificationScreen') iconSource = bellIcon;
          if (route.name === 'AgencyChatScreen') iconSource = sendIcon;

          return focused ? (
            <ImageBackground
              source={activeBg}
              style={styles.activeContainer}
              imageStyle={styles.activeBgImage}
            >
              <View style={styles.iconBgCircle}>
                <Image
                  source={iconSource}
                  style={[styles.icon, { tintColor: '#FFFFFF' }]}
                />
              </View>
            </ImageBackground>
          ) : (
            <View style={styles.inactiveContainer}>
              <Image
                source={iconSource}
                style={[styles.icon, { tintColor: 'white' }]}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="AgencyProfileScreen"
        component={AgencyProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Tab.Screen
        name="AgencyNotificationScreen"
        component={AgencyNotificationScreen}
        options={{ title: 'Notifications' }}
      />
      <Tab.Screen
        name="AgencyChatScreen"
        component={AgencyChatScreen}
        options={{ title: 'Chat' }}
      />
    </Tab.Navigator>
  );
}

export default AgencyTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F9864A',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeContainer: {
    padding: 8,
    borderRadius: 25,
    top: -25,
    elevation: 0,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  icon: {
    width: 25,
    height: 25,
  },
  activeBgImage: {
    resizeMode: 'contain',
    width: 100,
    height: 50,
    left: -25,
  },
  iconBgCircle: {
    backgroundColor: '#F9864A',
    padding: 20,
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
