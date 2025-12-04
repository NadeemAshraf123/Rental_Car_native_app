import React, { useEffect,useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { fetchCarDetail, CarDetail } from '../../redux/homeSlice';
import type { HomeCar } from '../../redux/homeSlice';


const carImageMap: Record<string, any> = {
  'Car1.png': require('../../assets/homeCars/Car1.png'),
  'Car2.png': require('../../assets/homeCars/Car2.png'),
  'Car3.png': require('../../assets/homeCars/Car3.png'),
  'cars.png': require('../../assets/homeCars/homeAgenciesImages/cars.png'),
};

type CarsDetailRouteParams = {
  car: HomeCar;
};

const CarsDetailScreen = ({ navigation }: any) => {
  const [selectedBooking, setSelectedBooking] = useState({
  startDate: null,
  endDate: null,
  pickUpTime: null,
  returnTime: null
});

  const route = useRoute<RouteProp<Record<string, CarsDetailRouteParams>, string>>();
  const { car } = route.params;

  const dispatch = useDispatch<AppDispatch>();
  const { currentCarDetail, carDetailLoading, error } = useSelector(
    (state: RootState) => state.home
  );


  useEffect(() => {
  if (route.params?.selectedData) {
    setSelectedBooking(route.params.selectedData);
  }
}, [route.params]);


  useEffect(() => {
    if (car?.id) {
      dispatch(fetchCarDetail(car.id));
    }
  }, [car?.id, dispatch]);

  const imageSource = car
  ? typeof car.image === 'string'
    ? carImageMap[car.image] || carImageMap['Car1.png']
    : car.image
  : carImageMap['Car1.png']; 


  const detail: CarDetail | null = currentCarDetail;

  const FeatureBox = ({ iconName, title, subtitle }: { iconName: string; title: string; subtitle: string }) => (
    <View style={styles.featureBox}>
      <MaterialCommunityIcon name={iconName} size={24} color="#F9864A" />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureSubtitle}>{subtitle}</Text>
    </View>
  );

  const SpecItem = ({ iconName, label }: { iconName: string; label: string }) => (
    <View style={styles.specItem}>
      <MaterialCommunityIcon name={iconName} size={18} color="#999" />
      <Text style={styles.specText}>{label}</Text>
    </View>
  );

  if (carDetailLoading && !detail) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#F9864A" />
      </View>
    );
  }

  if (!detail) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Car details not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" style={styles.headerIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{detail.name}</Text>
          <TouchableOpacity onPress={() => console.log('Toggle favorite')}>
            <Icon name="heart-outline" size={24} color="#000" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.carImageContainer}>
          <TouchableOpacity style={styles.carNavArrow}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Image
            source={imageSource}
            style={styles.carImage}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.carNavArrow}>
            <Icon name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.imageIndicator}>
            <Icon name="caret-up-sharp" size={10} color="#000" />
            <Icon name="caret-down-sharp" size={10} color="#000" />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Specification</Text>
          <View style={styles.featuresRow}>
            {detail.features.map((feature, index) => (
              <FeatureBox
                key={index}
                iconName={feature.icon}
                title={feature.title}
                subtitle={feature.subtitle}
              />
            ))}
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.carName}>{detail.name}</Text>
            <View style={styles.ratingRow}>
              <Icon name="star" size={16} color="#FFC72C" />
              <Text style={styles.ratingText}>
                {detail.rating} ({detail.reviews} Reviews)
              </Text>
            </View>
          </View>
          <Text style={styles.priceText}>
            {detail.price.toLocaleString()} D.A
            <Text style={styles.perDayText}> / per day</Text>
          </Text>
        </View>

        <View style={styles.specsGrid}>
          {detail.specs.map((spec, index) => (
            <SpecItem key={index} iconName={spec.icon} label={spec.label} />
          ))}
        </View>

        <View style={styles.renterContainer}>
          <Image source={require('../../assets/avatar/avatar1.jpg')} style={styles.renterImage} />
          <View style={styles.renterDetails}>
            <Text style={styles.renterName}>{detail.renter.name}</Text>
            <Text style={styles.renterRole}>{detail.renter.role}</Text>
          </View>
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <MaterialCommunityIcon name="message-outline" size={20} color="#F9864A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <MaterialCommunityIcon name="phone-outline" size={20} color="#F9864A" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.datePickerTitle}>Pick a date</Text>

        <TouchableOpacity style={styles.datePicker} onPress={() => navigation.navigate('TimeSelectingScreen')}>

          <Text style={styles.datePickerText}>Starting Date</Text>
          <Icon name="calendar-outline" size={24} color="blue" />
        </TouchableOpacity>
        
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.rentButton} onPress={() => navigation.navigate('BookingScreen', {
          car, 
          ...selectedBooking
        })
        }
      >
          <Text style={styles.rentButtonText}>Rent Now</Text>
          <Text style={styles.rentPriceText}>
            {detail.price.toLocaleString()} D.A
            <Text style={styles.rentPricePerDay}> /day</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarsDetailScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  headerIcon: {
    padding: 5,
  },

  carImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    position: 'relative',
    paddingHorizontal: 10,
  },
  carImage: {
    width: 270,
    height: 180,
    borderRadius: 10,
  },
  carNavArrow: {
    padding: 10,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    flexDirection: 'row',
    transform: [{ translateX: -10 }],
    backgroundColor: '#eeebebff',
    padding: 10,
    borderRadius: 50,
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f87232',
    marginBottom: 15,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 7,
    width: '30%',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#000',
    marginTop: 5,
  },
  featureSubtitle: {
    fontSize: 7,
    color: '#666',
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 15,
    
    
  },
  carName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '800',
    color: 'blue',
  },
  perDayText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
  specsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 25,
      
     

  },
  specItem: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '48%',
      marginBottom: 10,
  },
  specText: {
      marginLeft: 8,
      fontSize: 16,
      color: '#000',
  },


  renterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 25,


    shadowColor: '#000',
  shadowOffset: { width: 0, height: 26 },
  shadowOpacity: 0.25,
  shadowRadius: 34,

  elevation: 8,
  },
  renterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  renterDetails: {
    flex: 1,
  },
  renterName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  renterRole: {
    fontSize: 12,
    color: '#666',
  },
  contactButtons: {
    flexDirection: 'row',
  },
  contactButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },

  datePickerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#F9864A',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,



    shadowColor: '#000',
  shadowOffset: { width: 0, height: 26 },
  shadowOpacity: 0.25,
  shadowRadius: 34,

  elevation: 18,
    
  },
  datePickerText: {
    fontSize: 16,
    color: '#666',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopColor: '#f0f0f0',
  },
  rentButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9864A',
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 25,
  },
  rentButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  rentPriceText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  rentPricePerDay: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
  },
});