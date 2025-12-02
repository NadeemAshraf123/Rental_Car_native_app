import React, { useEffect, useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getAgencyById, updateAgency } from '../redux/agencycarSlice/AgencySlice'; 

export default function EditAgencyProfileScreen({ navigation }: any) {
  const dispatch = useDispatch();

 
  const { currentAgency: agency, loading } = useSelector((state: any) => state.agency);

  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  useEffect(() => {
    if (!agency) {
      dispatch(getAgencyById(1)); 
    }
  }, [agency, dispatch]);

 
  useEffect(() => {
    if (agency) {
      setUsername(agency.name || '');
      setEmail(agency.email || '');
      setPhone(agency.phone || '');
      setBio(agency.bio || '');
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [agency]);

  
  const handleUpdate = async () => {
    if (!username || !phone || !email) {
      Alert.alert('Validation Error', 'Username, phone, and email are required fields.');
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      Alert.alert('Password Error', 'New Password and Confirm Password do not match.');
      return;
    }

    const updatedData: any = { name: username, email, phone, bio };
    if (newPassword) updatedData.password = newPassword;

    try {
      const resultAction = await dispatch(updateAgency({ agencyId: agency.id, updatedData })).unwrap();
      Alert.alert('Success', `${resultAction.name}'s profile updated successfully.`);
      setNewPassword('');
      setConfirmPassword('');
      navigation.goBack();
    } catch (error) {
      console.error('Update failed:', error);
      Alert.alert('Update Failed', 'Could not update profile. Please check your connection or try again.');
    }
  };

  
  if (loading && !agency) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#F9864A" />
        <Text style={{ marginTop: 10 }}>Loading profile data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile Screen</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profilePictureContainer}>
            <Image 
              source={require('../assets/agencyreistration/profile1.png')}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay} />
          </View>
          <TouchableOpacity style={styles.editPictureButton}>
            <Text style={styles.editPictureText}>Edit Picture</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputGroup}>
            <Feather name="user" size={20} color="#666" style={styles.inputIcon} />
            <TextInput style={styles.input} value={username} onChangeText={setUsername} />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcon name="email-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
          </View>

          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputGroup}>
            <Feather name="phone" size={20} color="#666" style={styles.inputIcon} />
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          </View>

          <Text style={styles.label}>Change Password</Text>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcon name="lock-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="**********"
              secureTextEntry={!showNewPassword}
              placeholderTextColor="#999"
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <MaterialCommunityIcon 
                name={showNewPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} color="#666" style={styles.eyeIcon} 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcon name="lock-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="**********"
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialCommunityIcon 
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} color="#666" style={styles.eyeIcon} 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder="Edit Bio"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={bio}
            onChangeText={setBio}
          />
        </View>

        <TouchableOpacity 
          style={styles.updateButton} 
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.updateButtonText}>Update</Text>}
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
   
  },
  header: {
    backgroundColor: ORANGE,
    paddingTop: 60,
   
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