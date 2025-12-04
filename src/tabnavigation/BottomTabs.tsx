import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import homeIcon from '../assets/bottomTabBar/homeIcon.png';
import bellIcon from '../assets/bottomTabBar/bellIcon.png';
import sendIcon from '../assets/bottomTabBar/sendIcon.png';
import activeBg from '../assets/bottomTabBar/activeBg.png';

import HomeScreen from '../screens/home/HomeScreen';
import AgencyProfileScreen from '../agencySide/AgencyProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AgencyNotificationScreen from '../agencySide/AgencyNotificationScreen';
import SendScreen from '../screens/ChatScreen';
import { storage } from '../../App';

const Tab = createBottomTabNavigator();

// Wrapper component for Home tab that conditionally renders based on role
const HomeTabWrapper = (props: any) => {
  const [userRole, setUserRole] = useState<string>('owner');

  useEffect(() => {
    const initialRole = storage.getString('userRole');
    if (initialRole) {
      setUserRole(initialRole);
    }

    const subscription = storage.addOnValueChangedListener(() => {
      const newRole = storage.getString('userRole');
      if (newRole) {
        setUserRole(newRole);
      }
    });

    return () => subscription.remove();
  }, []);

  return userRole === 'Agency' ? <AgencyProfileScreen {...props} /> : <HomeScreen {...props} />;
};

// Wrapper component for Notifications tab that conditionally renders based on role
const NotificationTabWrapper = (props: any) => {
  const [userRole, setUserRole] = useState<string>('owner');

  useEffect(() => {
    const initialRole = storage.getString('userRole');
    if (initialRole) {
      setUserRole(initialRole);
    }

    const subscription = storage.addOnValueChangedListener(() => {
      const newRole = storage.getString('userRole');
      if (newRole) {
        setUserRole(newRole);
      }
    });

    return () => subscription.remove();
  }, []);

  return userRole === 'Agency' ? <AgencyNotificationScreen {...props} /> : <NotificationScreen {...props} />;
};

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
    
          <Tab.Screen name="Home" component={HomeTabWrapper} />
          <Tab.Screen name="Notifications" component={NotificationTabWrapper} />
          <Tab.Screen name="Send" component={SendScreen} />
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
    height: 55,
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


// see this ui image and we will be rendered this screen in main home screen as shown in image now the flow is completed , now tell me what you need moree to know and how you have understood the flow and which component if you want to see the ccode ?