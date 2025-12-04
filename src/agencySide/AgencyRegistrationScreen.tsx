import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { createAgencyThunk } from '../redux/agencycarSlice/AgencySlice';
import { RootState } from '../redux/store';

export default function AgencyRegistrationScreen({ navigation }: any) {
  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    if (!name || !phone || !address) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    const newAgency = { name, phone, address, userId };

    const resultAction = await dispatch(createAgencyThunk(newAgency));

    if (resultAction?.payload) {
      const createdAgency = resultAction.payload;
      setName('');
      setPhone('');
      setAddress('');

      // Navigate to Home (which will show AgencyProfileScreen in tabs)
      navigation.replace('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <Image
              source={require('../assets/avatar/emoji.png')}
              style={styles.headerImage}
            />
            <View style={styles.logoContainer}>
              <Text style={styles.logoTextBig}>GO</Text>
              <Text style={styles.logoTextSmall}>CarGo</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <MaterialCommunityIcon
                name="account"
                size={24}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="agency name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Icon name="phone" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <View style={styles.inputGroup}>
              <Icon name="map-pin" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="address"
                placeholderTextColor="#999"
                value={address}
                onChangeText={setAddress}
              />
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerCircle} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#F9864A',
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    overflow: 'hidden',
    position: 'relative',
  },
  headerImage: {
    width: 250,
    height: 180,
    resizeMode: 'contain',
    position: 'absolute',
    top: 20,
    right: -30,
  },
  logoContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  logoTextBig: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 50,
    paddingTop: 40,
  },
  logoTextSmall: {
    fontSize: 18,
    color: '#fff',
    marginTop: -10,
  },
  formContainer: {
    paddingHorizontal: 30,
    marginTop: 50,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 13,
    height: 55,
    borderWidth: 0.5,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 0,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#FF7F50',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  footerCircle: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 200,
    height: 190,
    borderRadius: 100,
    backgroundColor: '#FF7F50',
    opacity: 0.9,
  },
});
