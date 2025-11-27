import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const CarCard = ({ carName, imageUri, features }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.carName}>{carName}</Text>
      <View style={styles.cardContent}>
        

        <Image 
          source={imageUri}
          style={styles.carImage}
          resizeMode="contain"
        />

        
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
            
              {feature.icon === 'automatic' && <MaterialCommunityIcon name="dots-grid" size={16} color="#333" style={styles.featureIcon} />}
              {feature.icon === 'doors' && <MaterialCommunityIcon name="car-door" size={16} color="#333" style={styles.featureIcon} />}
              {feature.icon === 'mileage' && <MaterialCommunityIcon name="speedometer" size={16} color="#333" style={styles.featureIcon} />}
              {feature.icon === 'ac' && <Feather name="cloud-snow" size={16} color="#333" style={styles.featureIcon} />}
              
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>

      </View>
    </View>
  );
};


export default function AgencyProfileScreen( {navigation} ) {
  
  const carData = [
    { 
      id: 1, 
      name: 'hyundai', 
      image: require('../assets/agencyreistration/white.png'), 
      features: [
        { icon: 'automatic', text: 'Automatic' },
        { icon: 'doors', text: '5 Doors' },
        { icon: 'mileage', text: '420 km' },
        { icon: 'ac', text: 'A/C' },
      ]
    },
    { 
      id: 2, 
      name: 'peugeot', 
      image: require('../assets/agencyreistration/red1.png'),
      features: [
        { icon: 'automatic', text: 'Automatic' },
        { icon: 'doors', text: '5 Doors' },
        { icon: 'mileage', text: '280 km' },
        { icon: 'ac', text: 'A/C' },
      ]
    },
    { 
      id: 3, 
      name: 'AUDI', 
      image: require('../assets/agencyreistration/blueCar.png'),
      features: [
        { icon: 'automatic', text: 'Automatic' },
        { icon: 'doors', text: '5 Doors' },
        { icon: 'mileage', text: '350 km' },
        { icon: 'ac', text: 'A/C' },
      ]
    },
    { 
      id: 4, 
      name: 'Kia', 
      image: require('../assets/agencyreistration/black2.png'),
      features: [
        { icon: 'automatic', text: 'Automatic' },
        { icon: 'doors', text: '3 Doors' },
        { icon: 'mileage', text: '300 km' },
        { icon: 'ac', text: 'A/C' },
      ]
    },
    { 
      id: 5, 
      name: 'Toyota Rav', 
      image: require('../assets/agencyreistration/black1.png'),
      features: [
        { icon: 'automatic', text: 'Automatic' },
        { icon: 'doors', text: '5 Doors' },
        { icon: 'mileage', text: '450 km' },
        { icon: 'ac', text: 'A/C' },
      ]
    },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Feather name="menu" size={28} color="#F9864A" />
        </TouchableOpacity>        
        <Text style={styles.title}>OUR PROFILE</Text>
        
        <Image 
          source={require('../assets/agencyreistration/profile1.png')} 
          style={styles.stackImage} 
          resizeMode="contain"
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {carData.map(car => (
          <CarCard 
            key={car.id}
            carName={car.name}
            imageUri={car.image}
            features={car.features}
          />
        ))}    
        <View style={styles.addCarContainer}>
          <TextInput
            style={styles.addCarInput}
            placeholder="add another car"
            placeholderTextColor="#999"
            editable={false}
          />
          <TouchableOpacity style={styles.plusButton}>
            <Feather name="plus" size={24} color="#0e0d0dff" />
          </TouchableOpacity>
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 25,
  },
  stackImage: {
    width: 45,
    height: 45,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 15,

    marginBottom: 15,
    width: 310,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  carName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#333',
    textTransform: 'lowercase',
    marginLeft: 40,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carImage: {
    width: '55%',
    height: 80,
    marginRight: 5,
  },
  featuresContainer: {
    width: '40%', 
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  featureIcon: {
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  addCarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor:  '#ccc',
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: 0,
    marginBottom: 15,
    height: 50,
    shadowColor: '#908d8dff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  addCarInput: {
    flex: 1,
    fontSize: 16,
    color: '#312d2dff',
  },
  plusButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#dbd7d6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});