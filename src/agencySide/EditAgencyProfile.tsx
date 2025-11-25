import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditAgencyProfile( {navigation} ) {
  
  const [username, setUsername] = React.useState('Magi Car');
  const [email, setEmail] = React.useState('amel73@gmail.com');
  const [phone, setPhone] = React.useState('0554784308');
  const [bio, setBio] = React.useState('');
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  
  const handleUpdate = () => {
    navigation.navigate('AgencyNotificationScreen')
    console.log('Profile Updated!');
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profilePictureContainer}>
            <Image 
              source= {require('../assets/agencyreistration/profile1.png')} 
              style={styles.profileImage} 
              resizeMode="cover"
            />
            <View style={styles.imageOverlay} />
            {/* <Text style={styles.imageText}>MAGI CAR</Text> */}
          </View>
          
          <TouchableOpacity style={styles.editPictureButton}>
            <Text style={styles.editPictureText}>Edit Picture</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputGroup}>
            <Feather name="user" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcon name="email-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputGroup}>
            <Feather name="phone" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.label}>change Password</Text>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcon name="lock-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="**********"
              secureTextEntry={!showNewPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <MaterialCommunityIcon 
                name={showNewPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="#666" 
                style={styles.eyeIcon} 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>confirm password</Text>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcon name="lock-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="**********"
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialCommunityIcon 
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="#666" 
                style={styles.eyeIcon} 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>BIO</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder="Edit Bio"
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
            value={bio}
            onChangeText={setBio}
          />
        </View>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const ORANGE = '#F9864A';
const LIGHT_ORANGE = '#FFC46B';
const DARK_GRAY = '#333';
const LIGHT_GRAY = '#f8f8f8';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    // paddingBottom: 40,
  },
  header: {
    backgroundColor: ORANGE,
    paddingTop: 60,
    // paddingBottom: 120,
    paddingBottom: 50,

    alignItems: 'center',
    position: 'relative',
    height: 200,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: 40,
  },
  

  profileSection: {
    alignItems: 'center',
    marginTop: -80, 
    marginBottom: 0,
  },
  profilePictureContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
  editPictureButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  editPictureText: {
    fontSize: 16,
    color: DARK_GRAY,
    fontWeight: '900',
  },
  
  formSection: {
    paddingHorizontal: 25,
  },
  label: {
    fontSize: 13,
    fontWeight: '900',
    color: DARK_GRAY,
    marginTop: 8,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    height: 35,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: DARK_GRAY,
    paddingVertical: 0,
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  
  bioInput: {
    height: 100, 
    textAlignVertical: 'top', 
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 30,
  },
  
  updateButton: {
    backgroundColor: ORANGE,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});