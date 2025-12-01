import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AgencyDrawer from './AgencyDrawer';
import AgencyTabNavigator from '../../../agencySide/agencyTabNavigator/AgencyTabNavigator';
import AgencyProfileScreen from '../../../agencySide/AgencyProfileScreen';


const Drawer = createDrawerNavigator();

export function AgencyDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AgencyDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {
          width: 280,
        },
      }}
      initialRouteName='AgencyProfileScreen'
    >
    <Drawer.Screen name="AgencyProfileScreen" component={AgencyProfileScreen} />
      <Drawer.Screen
        name="AgencyTabs"
        component={AgencyTabNavigator}
      />
    </Drawer.Navigator>
  );
}

export default AgencyDrawerNavigator;
