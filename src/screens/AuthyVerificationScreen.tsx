import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
} from 'react-native';
import AppButton from '../common/AppButton';

const AuthyVerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(12);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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
        source={require('../assets/letsGo/AuthImage.jpg')} 
        style={styles.illustration}
      />

      <View style={styles.AuthContainer}>
      <View style={styles.verificationheading}>
      <Text style={styles.heading}>Authy Verification</Text>
      </View>

    
      <View style={styles.subTextContainer}>
      <Text style={styles.subText}>
        Copy the verification code in your authy application to verify this account recovery
      </Text>
      </View>

    
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <View key={index} style={styles.codeBox}>
            <Text style={styles.codeText}>{digit || '•'}</Text>
          </View>
        ))}
      </View>
      </View>

    
      <Text style={styles.timerText}>{`00:${timer < 10 ? '0' : ''}${timer} Sec`}</Text>

    
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Don't receive code?</Text>
        <Pressable onPress={() => setTimer(12)}>
          <Text style={styles.resendLink}> Resend</Text>
        </Pressable>
      </View>

    
      <View style={styles.submitBtnContainer}>
        <AppButton label="Submit verification" onPress={() => navigation.navigate('NewPasswordScreen')} variant="primary" />
      </View>
    </SafeAreaView>
  );
};

export default AuthyVerificationScreen;


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
    width: 200,
    height: 220,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
  AuthContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
  },
verificationheading: {
        paddingHorizontal: 30,
         marginTop: 20,
         textAlign: 'left',
        
  },
  heading: {
    fontSize: 24,
    fontWeight: '900',
    color: 'black',
    textAlign: 'left',
    marginTop: 10,
  },
  subTextContainer: {
    width: '70%',
  },
  subText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
    marginHorizontal: 30,
    marginTop: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  codeBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  timerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#f57c00',
    marginTop: 30,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  resendText: {
    fontSize: 12,
    color: '#333',
  },
  resendLink: {
    fontSize: 12,
    color: 'blue',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  submitBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
