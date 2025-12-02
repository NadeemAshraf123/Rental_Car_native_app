import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAgencyCars } from '../redux/agencycarSlice/agencyCarsSlice';
import { getAgencyById } from '../redux/agencycarSlice/AgencySlice'; 

// CarCard component
const CarCard = ({ carName, imageUri, features }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.carName}>{carName}</Text>
      <View style={styles.cardContent}>
        <Image source={imageUri} style={styles.carImage} resizeMode="contain" />
        <View style={styles.featuresContainer}>
          {features.map((feature: any, index: number) => (
            <View key={index} style={styles.featureRow}>
              {feature.icon === 'automatic' && (
                <MaterialCommunityIcon name="dots-grid" size={16} color="#333" style={styles.featureIcon} />
              )}
              {feature.icon === 'doors' && (
                <MaterialCommunityIcon name="car-door" size={16} color="#333" style={styles.featureIcon} />
              )}
              {feature.icon === 'mileage' && (
                <MaterialCommunityIcon name="speedometer" size={16} color="#333" style={styles.featureIcon} />
              )}
              {feature.icon === 'ac' && (
                <Feather name="cloud-snow" size={16} color="#333" style={styles.featureIcon} />
              )}
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default function AgencyProfileScreen({ navigation }: any) {
  const dispatch = useDispatch();

  // Get agency from Redux store
  const currentAgency = useSelector((state: any) => state.agency.currentAgency);
  const { list: carData, loading } = useSelector((state: any) => state.agencyCars);

  const agencyId = currentAgency?.id;

  // Map car images
  const imageMap: Record<string, any> = {
    'white.png': require('../assets/agencyreistration/white.png'),
    'red1.png': require('../assets/agencyreistration/red1.png'),
    'blueCar.png': require('../assets/agencyreistration/blueCar.png'),
    'black2.png': require('../assets/agencyreistration/black2.png'),
    'black1.png': require('../assets/agencyreistration/black1.png'),
  };

  // Redirect if agency data not loaded
  useEffect(() => {
    if (!currentAgency) {
      navigation.replace('AgencyRegistrationScreen'); // redirect to register if not found
    }
  }, [currentAgency, navigation]);

  // Fetch cars whenever agencyId exists
  useEffect(() => {
    if (agencyId) {
      dispatch(getAgencyCars(agencyId));
    }
  }, [agencyId, currentAgency, dispatch]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Feather name="menu" size={28} color="#F9864A" />
        </TouchableOpacity>
        <Text style={styles.title}>OUR Agency PROFILE</Text>
        <Image
          source={currentAgency?.image ? { uri: currentAgency.image } : require('../assets/agencyreistration/profile1.png')}
          style={styles.stackImage}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <Text style={styles.loadingText}>Loading cars...</Text>
        ) : carData.length > 0 ? (
          carData.map((car: any) => (
            <CarCard
              key={car.id}
              carName={car.name}
              imageUri={imageMap[car.image] || require('../assets/agencyreistration/white.png')}
              features={car.features}
            />
          ))
        ) : (
          <Text style={styles.loadingText}>No cars added yet</Text>
        )}

        <View style={styles.addCarContainer}>
          <TextInput
            style={styles.addCarInput}
            placeholder="add another car"
            placeholderTextColor="#999"
            editable={false}
          />
          
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => navigation.navigate('AddNewCarScreen', { agencyId })}
          >
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9864A',
    marginTop: 25,
    letterSpacing: 1,
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
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  carName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#333',
    textTransform: 'capitalize',
    marginLeft: 10,
    marginBottom: 5,
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
    fontSize: 13,
    color: '#444',
    fontWeight: '600',
  },
  addCarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#ccc',
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
    fontSize: 15,
    color: '#333',
    fontStyle: 'italic',
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9864A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
