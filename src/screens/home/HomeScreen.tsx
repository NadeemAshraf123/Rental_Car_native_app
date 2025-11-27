import React from 'react';
import { View, StyleSheet, ImageBackground , Text, TouchableOpacity } from 'react-native';
import HeaderBar from './HeaderBar';
import { ScrollView } from 'react-native';
import ContentPanel from './ContentPanel';

const MAP_HEIGHT = 350;

const SPACER_HEIGHT = 300;


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

      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapSpacer}  />

        <ContentPanel />

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
    height: MAP_HEIGHT,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  mapSpacer: {
    height: SPACER_HEIGHT,
  },
  scrollContentContainer: {
    flexGrow: 1, 
    zIndex: 2,
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
  CarBtn: {
    padding: 10,
    marginBottom: 5,
    flexDirection: 'row',
    gap: 50,
  },
  btn: {
    backgroundColor: '#F9864A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,


  }
});
