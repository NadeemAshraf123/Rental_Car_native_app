import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AgencyDrawer from './AgencyDrawer';
import AgencyTabNavigator from '../../../agencySide/agencyTabNavigator/AgencyTabNavigator';


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
    >
      <Drawer.Screen
        name="AgencyTabs" // this will render all bottom tabs
        component={AgencyTabNavigator}
      />
    </Drawer.Navigator>
  );
}

export default AgencyDrawerNavigator;
