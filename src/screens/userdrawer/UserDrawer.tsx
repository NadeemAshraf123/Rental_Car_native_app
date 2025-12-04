import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { fetchAgencyByUserId } from '../../redux/agencycarSlice/AgencySlice';
import { storage } from '../../../App';

const UserDrawer = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [themeLight, setThemeLight] = useState(true);
  const [isAccountOptionsOpen, setIsAccountOptionsOpen] = useState(false);
  const [activeAccount, setActiveAccount] = useState('owner');

  const scheme = useColorScheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.auth.user?.id);
  const isDark = !themeLight;
  const dynamicStyles = getStyles(isDark);

  const handleAccountSelection = async (targetAccount: 'owner' | 'Agency') => {
    setActiveAccount(targetAccount);
    storage.set('userRole', targetAccount);

    if (targetAccount === 'Agency') {
      if (userId) {
        try {
          const resultAction = await dispatch(fetchAgencyByUserId(userId) as any);
          const agency = resultAction.payload;
          
          if (agency) {
            (navigation as any).navigate('Home');
          } else {
            (navigation as any).navigate('AgencyRegistrationScreen');
          }
        } catch (error) {
          console.error('Error fetching agency:', error);
          (navigation as any).navigate('AgencyRegistrationScreen');
        }
      } else {
        (navigation as any).navigate('AgencyRegistrationScreen');
      }
    } else {
      (navigation as any).navigate('Home');
    }
  };

  return (
    <ScrollView style={dynamicStyles.container}>
      <View style={dynamicStyles.profileContainer}>
        <Image
          source={require('../../assets/profile/profile.png')}
          style={dynamicStyles.profileImage}
        />
        <TouchableOpacity style={dynamicStyles.cameraIcon}>
          <Icon name="photo-camera" size={12} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={dynamicStyles.homeContainer}>
        <Text style={dynamicStyles.homeText}>home</Text>
        <Image
          source={require('../../assets/avatar/avatar1.jpg')}
          style={dynamicStyles.iconImage}
        />
      </View>

      <View style={dynamicStyles.card}>
        <TouchableOpacity
          style={dynamicStyles.row}
          onPress={() => setIsAccountOptionsOpen(prev => !prev)}
        >
          <View style={dynamicStyles.SwitchContainer}>
            <Image
              source={require('../../assets/profile/profileIcons/userIcon.png')}
              style={dynamicStyles.CommonIconImage}
            />
            <Text style={dynamicStyles.rowText}>Switch Account</Text>
            <View style={dynamicStyles.SwitchiconContainer}>
              <Icon
                name={isAccountOptionsOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={20}
                color="#fff"
              />
            </View>
          </View>
        </TouchableOpacity>

        {isAccountOptionsOpen && (
          <View>
            <TouchableOpacity
              style={[
                dynamicStyles.accountOptionRow,
                activeAccount === 'Agency' && dynamicStyles.accountOptionRowActive,
              ]}
              onPress={() => handleAccountSelection('Agency')}
            >
              <View style={dynamicStyles.radioDot}>
                {activeAccount === 'Agency' && <View style={dynamicStyles.radioDotActive} />}
              </View>
              <Text style={dynamicStyles.accountOptionText}>Agency</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                dynamicStyles.accountOptionRow,
                activeAccount === 'owner' && dynamicStyles.accountOptionRowActive,
              ]}
              onPress={() => handleAccountSelection('owner')}
            >
              <View style={dynamicStyles.radioDot}>
                {activeAccount === 'owner' && <View style={dynamicStyles.radioDotActive} />}
              </View>
              <Text style={dynamicStyles.accountOptionText}>User</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={dynamicStyles.card}>
        <TouchableOpacity
          style={dynamicStyles.row}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Icon name="edit" size={15} color={isDark ? '#fff' : '#000'} />
          <Text style={dynamicStyles.rowText}>Edit profile information</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={dynamicStyles.row}
          onPress={() => navigation.navigate('ProfileNotificationScreen')}
        >
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

        <TouchableOpacity
          style={dynamicStyles.row}
          onPress={() => navigation.navigate('LanguageScreen')}
        >
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

        <TouchableOpacity
          style={dynamicStyles.row}
          onPress={() => navigation.navigate('PrivacyPolicyScreen')}
        >
          <Icon name="privacy-tip" size={15} color={isDark ? '#fff' : '#000'} />
          <Text style={dynamicStyles.rowText}>Privacy policy</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={dynamicStyles.logoutButton}
        onPress={() => {
          dispatch(logout());
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
        }}
      >
        <Icon name="logout" size={20} color="#fff" />
        <Text style={dynamicStyles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserDrawer;


const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {padding: 16, backgroundColor: isDark ? '#121212' : '#fff'},
    profileContainer: {alignItems: 'center', marginBottom: 16},
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
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 3,
    },
    rowText: {
      flex: 1,
      marginLeft: 8,
      fontSize: 12,
      color: isDark ? '#fff' : '#000',
    },
    rightText: {fontSize: 12, color: 'blue'},
    toggleContainer: {flexDirection: 'row', alignItems: 'center', gap: 8},

    accountOptionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingLeft: 20,
      borderTopWidth: 0.5,
      borderTopColor: isDark ? '#333' : '#eee',
    },
    accountOptionRowActive: {
      backgroundColor: isDark
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.05)',
    },
    accountOptionText: {
      fontSize: 12,
      color: isDark ? '#fff' : '#000',
      fontWeight: '600',
    },
    radioDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#F9864A',
      marginRight: 12,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioDotActive: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#F9864A',
    },
    // ------------------------------------------------

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
