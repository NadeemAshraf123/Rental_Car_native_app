import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, SafeAreaView, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import { findUserByEmail } from '../api/api';
import AppInput from '../common/AppInput';
import AppButton from '../common/AppButton';

const ForgotPasswordScreen = ({navigation}) => {

  const [email, setEmail] = useState('');

 const handleEmailSubmit = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    findUserByEmail(email)
      .then((user) => {
        if (user) {
          navigation.navigate('NewPasswordScreen', { userId: user.id });
        } else {
          Alert.alert('Email not found', 'Please check and try again');
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Something went wrong');
      });
  };




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>09:41</Text>
        <Image
          source={require('../assets/letsGo/Control.jpg')}
          style={styles.statusImage}
        />
      </View>

      <Image
        source={require('../assets/letsGo/forgotPasswordImage.jpg')}
        style={styles.forgotPasswordImage}
      />

      <View style={styles.forgotpasswordheading}>
        <Text style={styles.heading}>Forgot</Text>
        <Text style={styles.heading}>Password?</Text>
      </View>

      <Text style={styles.subText}>
        Don’t worry! It happens. Please input your email to fix the issue and we
        will send code in the email.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          placeholder="Input here"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.paperInput}
          theme={{colors: {primary: '#f57c00'}}}
        />
      </View>

      <View style={styles.submitBtnContainer}>
        <AppButton
          label="Submit"
          onPress={handleEmailSubmit}
          variant="primary"
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  timeText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  statusImage: {
    width: 80,
    height: 20,
    resizeMode: 'contain',
  },
  forgotPasswordImage: {
    width: 200,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
  forgotpasswordheading: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
  subText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'left',
    marginHorizontal: 30,
    marginTop: 10,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paperInput: {
    width: '80%',
    backgroundColor: 'white',
    marginBottom: 16,
  },

  submitBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
});
