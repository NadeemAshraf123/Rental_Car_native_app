import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import AppInput from '../../common/AppInput';
import AppButton from '../../common/AppButton';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export default function EditProfileScreen() {
  const [username, setUsername] = useState('Amel-Za');
  const [email, setEmail] = useState('amel73@gmail.com');
  const [phone, setPhone] = useState('0554784308');
  const [password, setPassword] = useState('********');
  const [confirmPassword, setConfirmPassword] = useState('********');
  const [profileImage, setProfileImage] = useState(
    'https://i.pravatar.cc/300?img=47',
  );

  const navigation = useNavigation();

  const handleUpdate = () => {
    console.log('Profile updated');
  };

  const handleImageChange = () => {
    console.log('Change profile image');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#FF7A00" />

      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Pressable onPress={handleImageChange} style={styles.avatarWrapper}>
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        </Pressable>
        <Text style={styles.editImageText}>Edit Image</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Username</Text>
          <AppInput
            icon="user"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            containerStyle={styles.inputContainer}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <AppInput
            icon="mail"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.inputContainer}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone Number</Text>
          <AppInput
            icon="phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            containerStyle={styles.inputContainer}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Change Password</Text>
          <AppInput
            icon="lock"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter new password"
            secureTextEntry
            showToggle
            containerStyle={styles.inputContainer}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirm Password</Text>
          <AppInput
            icon="lock"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            secureTextEntry
            showToggle
            containerStyle={styles.inputContainer}
          />
        </View>

        <AppButton
          label="Update"
          onPress={() => navigation.goBack()}
          fullWidth
          style={styles.updateButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

header: {
  backgroundColor: '#FF7A00',
  height: 130, 
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 20,
  position: 'relative',
  
  justifyContent: 'center',

},
backButton: {
  position: 'absolute',
  left: 20,
  top: 35,
},

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 40,
  },

  avatarContainer: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 108,
    height: 108,
    borderRadius: 54,
  },
  editImageText: {
    marginTop: 6,
    fontSize: 13,

    fontWeight: '600',
    marginBottom: 98,
  },

  form: {
    paddingTop: 60,
    paddingHorizontal: 44,
  },

  field: {},
  label: {
    fontSize: 14,
    fontWeight: '900',
    color: '#333',
    marginBottom: 3,
    marginLeft: 4,
  },

  inputContainer: {
    width: '100%',
    height: 34,
    borderRadius: 5,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },

  updateButton: {
    marginTop: 40,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#FF7A00',
    elevation: 3,
    alignSelf: 'center',
    width: '90%',
  },


});
