import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import AppInput from '../common/AppInput';
import AppButton from '../common/AppButton';
// import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation, ...TextInputProps}) => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  console.log('fullName', fullName);

  return (
    <SafeAreaView style={styles.container}>
      <View>
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
        <Text style={styles.heading}>Welcome Back!</Text>

        <Image
          source={require('../assets/letsGo/welcoming.png')}
          style={styles.welcomeImage}
        />


        <View style={styles.inputContainer}>
          <AppInput
            placeholder="full name"
            value={fullName}
            onChangeText={setFullName}
            icon="user"
            roundedIcon={true}
            // error="full name must be required"
          />

          <AppInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock"
            roundedIcon={false}
            showToggle={true}
            // error="Password must be required"

          />
        </View>

        <View style={styles.forgotButtonContainer}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
          <Pressable
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
            style={({pressed}) => [
              {
                backgroundColor: 'transparent',
                paddingHorizontal: 20,
                borderRadius: 8,
              },
            ]}>
            <Text style={{color: 'blue', fontSize: 12}}> Click Here</Text>
          </Pressable>
        </View>

        <View style={styles.signInBtnContainer}>
          <AppButton
            label="Sign In"
            onPress={() => navigation.navigate('Home')}
            variant="primary"
          />
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.lines}></View>
          <Text style={styles.dividerText}>Sign In with</Text>
          <View style={styles.lines}></View>
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

        <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <View style={{ width: 5}} />
            <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={styles.signUpLink}>Sign Up</Text>
            </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    zIndex: 2,
    elevation: 0,
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
  heading: {
    marginTop: 60,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  welcomeImage: {
    width: 130,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  forgotText: {
    fontSize: 10,
  },
  signInBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  lines: {
    flex: 1,
    height: 1,
    borderColor: 'black',
    color: 'black',
    backgroundColor: 'black',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: 'black',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,

  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginHorizontal: 6,
    

  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  signUpText: {
    fontSize: 12,
    color: '#333',

  },
  signUpLink: {
    fontSize: 12,
    color: 'blue',
    fontWeight: '900',
    marginLeft: 5,
  }
});
