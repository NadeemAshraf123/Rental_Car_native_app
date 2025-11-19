import {useState} from 'react';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Feather';
import homeIcon from '../assets/bottomTabBar/homeIcon.png';
import bellIcon from '../assets/bottomTabBar/bellIcon.png';
import sendIcon from '../assets/bottomTabBar/sendIcon.png';

import HomeScreen from '../screens/home/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SendScreen from '../screens/ChatScreen';
import {Image} from 'react-native';

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

          return (
            <View
              style={
                focused ? styles.activeContainer : styles.inactiveContainer
              }>
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  {tintColor: focused ? '#FFFFFF' : 'white'},
                ]}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
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
    backgroundColor: '#F9864A',
    padding: 6,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#FFFFFF',
    top: -20,
    elevation: 44,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,

},
inactiveContainer: {
    padding: 10,
},

icon: {
    width: 20,
    height:20,
},

});
