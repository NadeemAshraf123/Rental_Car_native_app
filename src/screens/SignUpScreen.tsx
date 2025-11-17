import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AppInput from '../common/AppInput';
import AppButton from '../common/AppButton';
import Icon from 'react-native-vector-icons/Feather';

const SignUpScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

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
        source={require('../assets/letsGo/header.jpg')}
        style={styles.topLeftShape}
      />

      <Text style={styles.heading}>Create Account</Text>


      <Image
        source={require('../assets/letsGo/signUpImage.jpg')}
        style={styles.signUpImage}
      />


      <View style={styles.inputContainer}>
        <AppInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          icon="user"
          roundedIcon={true}
        />
        <AppInput
          placeholder="Mail"
          value={email}
          onChangeText={setEmail}
          icon="mail"
          roundedIcon={false}
        />
        <AppInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          icon="lock"
          showToggle={true}
          roundedIcon={false}
        />
        <AppInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          icon="lock"
          showToggle={true}
          roundedIcon={false}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Pressable onPress={() => setAgreeTerms(!agreeTerms)}>
          <Icon
            name={agreeTerms ? 'check-square' : 'square'}
            size={20}
            color="#000"
          />
        </Pressable>
        <Text style={styles.checkboxText}>
          I agree to the UNICEF{' '}
          <Text style={styles.linkText}>Terms and Conditions</Text>
        </Text>
      </View>

      <View style={styles.signUpBtnContainer}>
        <AppButton
          label="Sign Up"
          onPress={() => console.log('Sign Up')}
          variant="primary"
        />
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Sign up with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
        <Image
          source={require('../assets/letsGo/socialMediaIcons/Facebook.png')}
          style={styles.socialIcon}
        />
        <Image
          source={require('../assets/letsGo/socialMediaIcons/Google.png')}
          style={styles.socialIcon}
        />
        <Image
          source={require('../assets/letsGo/socialMediaIcons/Apple.png')}
          style={styles.socialIcon}
        />
        <Image
          source={require('../assets/letsGo/socialMediaIcons/Twitter.png')}
          style={styles.socialIcon}
        />
      </View>

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.signInLink}> Sign In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
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
  topLeftShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 120,
    height: 100,
    resizeMode: 'contain',
    zIndex: 1,
  },
  signUpImage: {
    width: 130,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 60,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
    marginVertical: 0,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#333',
  },
  linkText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  signUpBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#999',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginHorizontal: 6,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signInText: {
    fontSize: 12,
    color: '#333',
  },
  signInLink: {
    fontSize: 12,
    color: 'blue',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
