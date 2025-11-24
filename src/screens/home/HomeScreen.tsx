import React from 'react';
import { View, StyleSheet, ImageBackground , Text, TouchableOpacity } from 'react-native';
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

        <View style={styles.CarBtn}>

         <TouchableOpacity onPress={() =>  navigation.navigate('CarsDetailScreen')} style={styles.btn}>
        <Text>Cars</Text>
      </TouchableOpacity>
        

         <TouchableOpacity  onPress={() =>  navigation.navigate('OurAgencyCarsScreen')}  style={styles.btn}>
        <Text>Agencies</Text>
      </TouchableOpacity>

         <TouchableOpacity style={styles.btn}>
        <Text>Famous</Text>
      </TouchableOpacity>
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
