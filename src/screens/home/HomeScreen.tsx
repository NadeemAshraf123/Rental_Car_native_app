import React from 'react';
import { View, StyleSheet, ImageBackground , Text } from 'react-native';
import HeaderBar from './HeaderBar';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/homeCars/map.jpg')}
        style={styles.mapBackground}
        resizeMode="cover"
      >
        <HeaderBar />
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>GO</Text>
        </View>

      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  mapBackground: {
    width: '100%',
    height: 250,
    position: 'relative',
  },

  content: {
    paddingBottom: 24,
  },

  sectionTitleWrapper: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7A00',
  },
});
