import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');
const BEST_OFFER_CARD_WIDTH = width * 0.9 - 40;

const OurCarsScreen = ({navigation}) => {
  const [withDriver, setWithDriver] = useState(false);

  const bestOffers = [
    {
      id: 'offer1',
      carImage: 'https://via.placeholder.com/200x100?text=Offer+Car+1',
      dealText: 'Enjoy our April Deals',
      discount: '30% off',
    },
  ];

  const availableCars = [
    {
      id: 'car1',
      make: 'Audi',
      image: require('../../assets/homeCars/Car5.png'),
      transmission: 'A/T',
      seats: 5,
      doors: 4,
      freeCancellation: true,
      rating: 4.1,
      price: 8000,
    },
    
    {
      id: 'car3',
      make: 'Mercedes-Benz',
      image: require('../../assets/homeCars/Car6.png'),
      
      transmission: 'M/T',
      seats: 4,
      doors: 2,
      freeCancellation: false,
      rating: 4.5,
      price: 12000,
    },
  ];

  const AvailableCarCard = ({car, isFirst}) => (
    <TouchableOpacity
      style={[styles.availableCarCard, isFirst && styles.firstCarCard]}>
      <Image
        source={ car.image}
        style={styles.availableCarImage}
        resizeMode="contain"
      />

      <View style={styles.availableCarContent}>
        <View style={styles.availableCarDetails}>
          <Text style={styles.availableCarMake}>{car.make}</Text>
          <View style={styles.availableCarSpecsRow}>
            <MaterialCommunityIcon name="cogs" size={16} color="#666" />
            <Text style={styles.availableCarSpecText}>{car.transmission}</Text>
            <MaterialCommunityIcon
              name="account-group"
              size={16}
              color="#666"
              style={styles.specIconMarginLeft}
            />
            <Text style={styles.availableCarSpecText}>{car.seats}</Text>
            <MaterialCommunityIcon
              name="car-door"
              size={16}
              color="#666"
              style={styles.specIconMarginLeft}
            />
            <Text style={styles.availableCarSpecText}>{car.doors}</Text>
          </View>
          <View style={styles.availableCarCancellationRow}>
            <Icon name="checkmark-circle" size={16} color="#38c172" />{' '}
            {/* Changed to Ionicons checkmark */}
            <Text style={styles.availableCarCancellationText}>
              Free cancelation
            </Text>
          </View>
        </View>

        <View style={styles.availableCarRatingPrice}>
          <View style={styles.availableCarRating}>
            <Icon name="star" size={14} color="#FFC72C" />
            <Text style={styles.availableCarRatingText}>{car.rating}</Text>
          </View>
          <Text style={styles.availableCarPrice}>{car.price} DA/Day</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerIcon}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Our Cars</Text>
          <TouchableOpacity
            onPress={() => console.log('Open right menu')}
            style={styles.headerRightIconContainer}>
            <Image
              source= {require('../../assets/homeCars/Agency.png') }
              style={styles.headerRightIcon}
            />

            
          </TouchableOpacity>
        </View>

        
        <View style={styles.bestOfferSection}>
          <Text style={styles.sectionHeading}>Best Offer</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            contentContainerStyle={styles.bestOfferCarousel}>
            {bestOffers.map(offer => (
              <View key={offer.id} style={styles.bestOfferCard}>
                <Image
                  source={require('../../assets/homeCars/Car4.png')}
                  style={styles.bestOfferCarImage}
                  resizeMode="contain"
                />
                <View style={styles.bestOfferTextContent}>
                  <Text style={styles.bestOfferDealText}>
                    Enjoy our April Deals
                  </Text>
                  <TouchableOpacity style={styles.discountButton}>
                    <Text style={styles.discountButtonText}>30% off</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.carouselDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        
        <View style={styles.availableCarsSection}>
          <View style={styles.availableCarsHeader}>
            <Text style={styles.availableCarsHeaderTitle}>Available Cars</Text>
          </View>

          <View style={styles.carsList}>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>With driver</Text>
              <Switch
                trackColor={{false: '#767577', true: '#f87232'}}
                thumbColor={withDriver ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() =>
                  setWithDriver(previousState => !previousState)
                }
                value={withDriver}
              />
            </View>

            {availableCars.map((car, index) => (
              <AvailableCarCard key={car.id} car={car} isFirst={index === 0} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OurCarsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'white',
    borderBottomColor: '#f0f0f0',
  },
  headerIcon: {
    position: 'absolute',
    left: 20,
    top: 50,
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#ffffffff' ,
    borderWidth: 0.5,
    borderColor: '#ccc'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  headerRightIconContainer: {
    position: 'absolute',
    right: 20,
    top: 40,
    padding: 5,
  },
  headerRightIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },

  sectionHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  bestOfferSection: {
    paddingTop: 20,

  },
  bestOfferCarousel: {
    paddingLeft: 50,
    paddingBottom: 10,
  },
  bestOfferCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  
  },
  bestOfferCarImage: {
    width: 150,
    height: 100,
  },
  bestOfferTextContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,

  },
  bestOfferDealText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000',
    textAlign: 'right',
    marginBottom: 5,
  },
  discountButton: {
    backgroundColor: '#f87232',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 13,

  },
  discountButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#f87232',
  },


  availableCarsSection: {
    
    paddingLeft: 20 ,
  },
  availableCarsHeader: {
    marginHorizontal: 20,
    marginBottom: 1,
  },
  availableCarsHeaderTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  
    paddingHorizontal: 20,
    marginBottom: -15, 
    zIndex: 10, 

  },
  toggleText: {
    fontSize: 12,
    color: '#000', 
    marginRight: 5,
    fontWeight: '600',
  },

  availableCarCard: {
  
    backgroundColor: '#fef0e9',
    borderRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginHorizontal: 20,
    marginBottom: 35,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    position: 'relative',
  },
  firstCarCard: {
    marginTop: 10,
  },
  availableCarImage: {
    width: '140%',
    height: 120,
    position: 'absolute',
    top: -60, 
    alignSelf: 'center',
    zIndex: 5, 
    marginTop: 20 ,
  },
  availableCarContent: {
   
    paddingTop: 60, 
    flexDirection: 'row',
    alignItems: 'flex-start', 
    paddingHorizontal: 20,
    paddingVertical: 1,
  },


  availableCarDetails: {
    flex: 2,
  },
  availableCarMake: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 5,
  },
  availableCarSpecsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  availableCarSpecText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    marginRight: 12,
  },
  specIconMarginLeft: {
    marginLeft: 12,
  },
  availableCarCancellationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availableCarCancellationText: {
    fontSize: 12,
    color: '#515452ff',
    marginLeft: 4,
    fontWeight: '500',
  },


  availableCarRatingPrice: {
    flex: 1.2, 
    alignItems: 'flex-end',
    marginTop: 4, 
  },
  availableCarRating: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 20,
    
  },
  availableCarRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginLeft: 4,
  },
  availableCarPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#f87232',
    textAlign: 'right',
  },
});
