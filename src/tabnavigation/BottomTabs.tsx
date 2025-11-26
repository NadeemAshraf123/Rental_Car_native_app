import React, { useEffect } from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import homeIcon from '../assets/bottomTabBar/homeIcon.png';
import bellIcon from '../assets/bottomTabBar/bellIcon.png';
import sendIcon from '../assets/bottomTabBar/sendIcon.png';
import activeBg from '../assets/bottomTabBar/activeBg.png';

import HomeScreen from '../screens/home/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SendScreen from '../screens/ChatScreen';
import { storage } from '../../App';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({focused}) => {
          let iconSource = null;

          if (route.name === 'Home') iconSource = homeIcon;
          if (route.name === 'Notifications') iconSource = bellIcon;
          if (route.name === 'Send') iconSource = sendIcon;

          return focused ? (
            <ImageBackground
              source={activeBg}
              style={styles.activeContainer}
              imageStyle={styles.activeBgImage}>
              <View style={styles.iconBgCircle}>
                <Image
                  source={iconSource}
                  style={[styles.icon, {tintColor: '#FFFFFF'}]}
                />
              </View>
            </ImageBackground>
          ) : (
            <View style={styles.inactiveContainer}>
              <Image
                source={iconSource}
                style={[styles.icon, {tintColor: 'white'}]}
              />
            </View>
          );
        },
      })}>
      {/* {usertype === 'user' ? ( */}
        {/* <> */}
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Notifications" component={NotificationScreen} />
          <Tab.Screen name="Send" component={SendScreen} />
        {/* </> */}
      {/* ) : (
        <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Notifications" component={NotificationScreen} />
          <Tab.Screen name="Send" component={SendScreen} />
        </>
      )} */}
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F9864A',
    height: 50,
    borderTopWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeContainer: {
    padding: 8,
    borderRadius: 25,
    top: -25,

    elevation: 20,
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
