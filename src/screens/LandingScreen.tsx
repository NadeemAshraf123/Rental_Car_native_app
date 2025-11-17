import React from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import AppButton from '../common/AppButton';

export default function LandingScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={require('../assets/letsGo/landing.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
      
        <View style={styles.top}>
          <Text style={styles.title}>Premium ride</Text>
          <Text style={styles.subtitle}>Affordable price</Text>
        </View>

        <View style={styles.bottom}>
          <AppButton
            label="Let’s Go!"
            onPress={() => navigation.navigate('LoginScreen')}
            variant="primary"
          />
        </View>
      </View>
    </ImageBackground>
  );
}



const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  top: {
    alignItems: 'center',
    marginTop: 20,
  },
  bottom: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
    fontFamily:  'baseStyle',

  },
  subtitle: {
    marginTop: 6,
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    opacity: 0.9,
    fontFamily: 'sans-serif',
  },
});
