import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import AppInput from '../common/AppInput';
import AppButton from '../common/AppButton';

const NewPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        source={require('../assets/letsGo/newpasswordImage.jpg')}
        style={styles.illustration}
      />

      <Text style={styles.heading}>Set new password</Text>

    
      <Text style={styles.subText}>
        Enter your new password below and check the hint while setting it.
      </Text>

      
      <View style={styles.inputContainer}>
        <AppInput
          placeholder="Input password here"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNewPassword}
          icon="lock"
          showToggle={true}
          roundedIcon={false}
          onTogglePress={() => setShowNewPassword(!showNewPassword)}
        />
        <AppInput
          placeholder="put here"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          icon="lock"
          showToggle={true}
          roundedIcon={false}
          onTogglePress={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </View>

    
      <View style={styles.submitBtnContainer}>
        <AppButton label="Submit password" onPress={() => navigation.navigate('LoginScreen')} variant="primary" />
      </View>
    </SafeAreaView>
  );
};

export default NewPasswordScreen;

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
  illustration: {
    width: 150,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  subText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 10,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
