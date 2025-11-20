import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const CustomDrawerContent = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [themeLight, setThemeLight] = useState(true);
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  
  const scheme = useColorScheme();
  const navigation = useNavigation();

  const isDark =  !themeLight;

  const dynamicStyles = getStyles(isDark);

  return (
    <ScrollView style={dynamicStyles.container}>
      
      <View style={dynamicStyles.profileContainer}>
        <Image source={require('../../assets/profile/profile.png')} style={dynamicStyles.profileImage} />
        <TouchableOpacity style={dynamicStyles.cameraIcon}>
          <Icon name="photo-camera" size={12} color="#fff" />
        </TouchableOpacity>
      </View>

    
      <View style={dynamicStyles.homeContainer}>
        <Text style={dynamicStyles.homeText}>home</Text>
        <Image
          source={require('../../assets/profile/profileIcons/rightMove.png')}
          style={dynamicStyles.iconImage}
        />
      </View>

      <View style={dynamicStyles.card}>
        <TouchableOpacity style={dynamicStyles.row} onPress={() => setAccountModalVisible(true)}>
          <View style={dynamicStyles.SwitchContainer}>
            <Image
              source={require('../../assets/profile/profileIcons/userIcon.png')}
              style={dynamicStyles.CommonIconImage}
            />
            <Text style={dynamicStyles.rowText}>Switch the account</Text>
            <View style={dynamicStyles.SwitchiconContainer}>
              <Icon name="arrow-drop-down" size={20} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Modal visible={accountModalVisible} transparent animationType="fade">
        <View style={dynamicStyles.modalOverlay}>
          <View style={dynamicStyles.modalContent}>
            <TouchableOpacity onPress={() => setAccountModalVisible(false)}>
              <Text style={dynamicStyles.modalOption}>Agency</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAccountModalVisible(false)}>
              <Text style={dynamicStyles.modalOption}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={dynamicStyles.card}>
        <TouchableOpacity style={dynamicStyles.row} onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="edit" size={15} color={isDark ? '#fff' : '#000'} />
          <Text style={dynamicStyles.rowText}>Edit profile information</Text>
        </TouchableOpacity>

        <TouchableOpacity style={dynamicStyles.row} onPress={() => navigation.navigate('ProfileNotificationScreen')}>
          <Icon name="notifications" size={15} color={isDark ? '#fff' : '#000'} />
          <Text style={dynamicStyles.rowText}>Notifications</Text>
          <View style={dynamicStyles.toggleContainer}>
            <Text style={{ color: notificationsEnabled ? '#F9864A' : '#ccc' }}>
              {notificationsEnabled ? 'On' : 'Off'}
            </Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#fff', true: '#F9864A' }}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={dynamicStyles.row} onPress={() => navigation.navigate('LanguageScreen')}>
          <Icon name="language" size={15} color={isDark ? '#fff' : '#000'} />
          <Text style={dynamicStyles.rowText}>Language</Text>
          <Text style={dynamicStyles.rightText}>English</Text>
        </TouchableOpacity>
      </View>

      <View style={dynamicStyles.card}>
        <TouchableOpacity style={dynamicStyles.row}>
          <Icon name="security" size={15} color={isDark ? '#fff' : '#000'} />
          <Text style={dynamicStyles.rowText}>Security</Text>
        </TouchableOpacity>

        <View style={dynamicStyles.row}>
          <Icon name="palette" size={15} color={isDark ? '#fff' : '#000'} />
          <Text style={dynamicStyles.rowText}>Theme</Text>
          <View style={dynamicStyles.toggleContainer}>
            <Icon name="wb-sunny" size={15} color={themeLight ? '#FFD700' : '#ccc'} />
            <Switch
              value={themeLight}
              onValueChange={() => setThemeLight(prev => !prev)}
              trackColor={{ false: '#fff', true: '#F9864A' }}
            />
            <Icon name="nights-stay" size={15} color={!themeLight ? '#333' : '#ccc'} />
          </View>
        </View>
      </View>

      <View style={dynamicStyles.card}>
        <TouchableOpacity style={dynamicStyles.row}>
          <Icon name="help-outline" size={15} color={isDark ? '#fff' : '#000'} />
          <Text style={dynamicStyles.rowText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={dynamicStyles.row}>
          <Icon name="contact-mail" size={15} color={isDark ? '#fff' : '#000'} />
          <Text style={dynamicStyles.rowText}>Contact us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={dynamicStyles.row} onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
          <Icon name="privacy-tip" size={15} color={isDark ? '#fff' : '#000'} />
          <Text style={dynamicStyles.rowText}>Privacy policy</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={dynamicStyles.logoutButton}>
        <Icon name="logout" size={20} color="#fff" />
        <Text style={dynamicStyles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default CustomDrawerContent;


const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: { padding: 16, backgroundColor: isDark ? '#121212' : '#fff' },
    profileContainer: { alignItems: 'center', marginBottom: 16 },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 6,
      borderColor: '#e3753b',
    },
    cameraIcon: {
      position: 'absolute',
      bottom: 0,
      right: '35%',
      backgroundColor: 'gray',
      borderRadius: 12,
      padding: 4,
    },
    homeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    homeText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: isDark ? '#fff' : '#000',
    },
    iconImage: {
      width: 10,
      height: 10,
      resizeMode: 'contain',
      marginLeft: 5,
    },
    card: {
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginVertical: 14,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,

    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 3,
    },
    rowText: { flex: 1, marginLeft: 8, fontSize: 12, color: isDark ? '#fff' : '#000' },
    rightText: { fontSize: 12, color: 'blue' },
    toggleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
      margin: 32,
      backgroundColor: '#fff',
      borderRightColor: 'red',
      borderRadius: 8,
      padding: 16,
    },
    modalOption: {
      fontSize: 12,
      paddingVertical: 8,
      borderBottomWidth: 0.5,
      borderColor: '#ccc',
    },
    SwitchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    CommonIconImage: {
      width: 20,
      height: 20,
    },
    SwitchiconContainer: {
      backgroundColor: '#F9864A',
      width: 22,
      height: 14,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoutButton: {
      flexDirection: 'row',
      backgroundColor: '#FF5722',
      padding: 12,
      borderRadius: 8,
      marginTop: 104,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoutText: {
      color: '#fff',
      fontSize: 16,
      marginLeft: 8,
    },
  });