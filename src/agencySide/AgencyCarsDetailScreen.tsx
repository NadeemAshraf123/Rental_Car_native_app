import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getSingleCarDetails } from '../redux/agencycarSlice/agencyCarsSlice';

export default function AgencyCarDetailsScreen({ route, navigation }: any) {
  const dispatch = useDispatch();
  const { carId, agencyId } = route.params;

  const { selectedCar, loading } = useSelector((state: any) => state.agencyCars);

  const imageMap: Record<string, any> = {
    'white.png': require('../assets/agencyreistration/white.png'),
    'red1.png': require('../assets/agencyreistration/red1.png'),
    'blueCar.png': require('../assets/agencyreistration/blueCar.png'),
    'black2.png': require('../assets/agencyreistration/black2.png'),
    'black1.png': require('../assets/agencyreistration/black1.png'),
  };

  useEffect(() => {
    dispatch(getSingleCarDetails({ agencyId, carId }));
  }, [carId]);

  if (loading || !selectedCar) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.loadingText}>Loading car details...</Text>
      </SafeAreaView>
    );
  }

  const {
    name,
    image,
    price,
    seats,
    transmission,
    doors,
    ac,
    acceleration,
    fuelType,
    coolSeatRating,
  } = selectedCar;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#F9864A" />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <TouchableOpacity>
          <Feather name="heart" size={24} color="#F9864A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={imageMap[image]} style={styles.carImage} resizeMode="contain" />

        <View style={styles.featuresRow}>
          <View style={styles.featureBox}>
            <MaterialCommunityIcon name="fuel" size={20} color="#333" />
            <Text style={styles.featureText}>{fuelType}</Text>
          </View>
          <View style={styles.featureBox}>
            <MaterialCommunityIcon name="seat" size={20} color="#333" />
            <Text style={styles.featureText}>Cool Seat ({coolSeatRating}★)</Text>
          </View>
          <View style={styles.featureBox}>
            <MaterialCommunityIcon name="speedometer" size={20} color="#333" />
            <Text style={styles.featureText}>0-100 km/h in {acceleration}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <DetailRow label="Price" value={`${price} D.A / per day`} />
          <DetailRow label="Seats" value={seats} />
          <DetailRow label="Transmission" value={transmission} />
          <DetailRow label="Doors" value={doors} />
          <DetailRow label="Air Conditioning" value={ac ? 'Yes' : 'No'} />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9864A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  carImage: {
    width: '100%',
    height: 180,
    marginVertical: 20,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureBox: {
    alignItems: 'center',
    width: '30%',
  },
  featureText: {
    fontSize: 12,
    color: '#444',
    marginTop: 5,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#F9864A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
});
