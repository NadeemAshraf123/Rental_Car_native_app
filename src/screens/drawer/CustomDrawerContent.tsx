import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerContentScrollView } from '@react-navigation/drawer';


export default function CustomDrawerContent(props: any) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [role, setRole] = useState<'Agency' | 'Owner'>('Agency');

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      
      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.profilePic} />
        <Text style={styles.username}>home</Text>

      
        <View style={styles.roleToggle}>
          <TouchableOpacity
            style={[styles.roleButton, role === 'Agency' && styles.activeRole]}
            onPress={() => setRole('Agency')}
          >
            <Text style={styles.roleText}>Agency</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, role === 'Owner' && styles.activeRole]}
            onPress={() => setRole('Owner')}
          >
            <Text style={styles.roleText}>Owner</Text>
          </TouchableOpacity>
        </View>
      </View>

    
      <ScrollView style={styles.menuSection}>
        <DrawerItem label="Edit profile information" icon="edit" />
        <DrawerItem
          label="Notifications"
          icon="notifications"
          rightComponent={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              thumbColor="#FF7A00"
            />
          }
        />
        <DrawerItem label="Language: English" icon="language" />
        <DrawerItem label="Security" icon="lock" />
        <DrawerItem
          label={`Theme: ${isDarkMode ? 'Dark' : 'Light'} mode`}
          icon="brightness-6"
          rightComponent={
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              thumbColor="#FF7A00"
            />
          }
        />
        <DrawerItem label="Help & Support" icon="help-outline" />
        <DrawerItem label="Contact us" icon="call" />
        <DrawerItem label="Privacy policy" icon="policy" />
      </ScrollView>

    
      <TouchableOpacity style={styles.logoutButton} onPress={() => props.navigation.navigate('LoginScreen')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

function DrawerItem({
  label,
  icon,
  rightComponent,
}: {
  label: string;
  icon: string;
  rightComponent?: React.ReactNode;
}) {
  return (
    <View style={styles.drawerItem}>
      <View style={styles.drawerItemLeft}>
        <Icon name={icon} size={22} color="#FF7A00" style={{ marginRight: 10 }} />
        <Text style={styles.drawerItemText}>{label}</Text>
      </View>
      {rightComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FF7A00',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  roleToggle: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 4,
  },
  roleButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  activeRole: {
    backgroundColor: '#FF7A00',
  },
  roleText: {
    color: '#333',
    fontWeight: '600',
  },
  menuSection: {
    marginTop: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  drawerItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF7A00',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
