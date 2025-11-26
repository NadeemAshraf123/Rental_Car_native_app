import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const FeatureBox = ({ iconName, title, subtitle, iconLibrary }) => {
  const IconComponent = iconLibrary === 'Feather' ? Feather : MaterialCommunityIcon;

  const getIcon = (name) => {
    switch (name) {
      case 'Diesel':
        return <MaterialCommunityIcon name="fuel" size={24} color="#FF7F50" />;
      case 'Cool Seat':
        return <MaterialCommunityIcon name="snowflake" size={24} color="#FF7F50" />;
      case 'Acceleration':
        return <MaterialCommunityIcon name="gauge" size={24} color="#FF7F50" />;
      default:
        return <IconComponent name={iconName} size={24} color="#FF7F50" />;
    }
  };

  return (
    <View style={styles.featureBox}>
      {getIcon(title)}
      <Text style={styles.featureBoxTitle}>{title}</Text>
      <Text style={styles.featureBoxSubtitle}>{subtitle}</Text>
    </View>
  );
};


export default function AgencyCarDetailScreen( {navigation} ) {
  
  
  const carData = {
    name: 'AUDI',
    image: require('../assets/agencyreistration/black1.png'),
    price: '9000 D.A',
    perUnit: '/ per day',

    specs: [
      { icon: 'phone', label: '4 Seats', key: 'seats', iconLibrary: 'Feather' },
      { icon: 'gas-station-outline', label: '4 Doors', key: 'doors', iconLibrary: 'MaterialCommunityIcon' },
      { icon: 'wrench', label: 'Manual', key: 'manual', iconLibrary: 'Feather' },
      { icon: 'snowflake', label: 'Air Conditioning', key: 'ac', iconLibrary: 'MaterialCommunityIcon' },
    ]
  };
  
  const handleSubmit = () => {
    navigation.navigate('CarProfileScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#000"  style={styles.headerbutton}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{carData.name}</Text>
          <TouchableOpacity style={styles.headerButton}  style={styles.headerbutton}>
            <Feather name="heart" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image 
            source={carData.image} 
            style={styles.carImage} 
            resizeMode="contain"
          />
        </View>

        <View style={styles.featureBoxesContainer}>
          <FeatureBox 
            title="Diesel" 
            subtitle="Common Fuel Injection" 
            iconLibrary="MaterialCommunityIcon"
          />
          <FeatureBox 
            title="Cool Seat" 
            subtitle="****" 
            iconLibrary="MaterialCommunityIcon"
          />
          <FeatureBox 
            title="Acceleration" 
            subtitle="0 - 100 km/ 11s" 
            iconLibrary="MaterialCommunityIcon"
          />
        </View>
        
        <View style={styles.detailSection}>
          <Text style={styles.carDetailName}>{carData.name}</Text>
          
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>{carData.price}</Text>
            <Text style={styles.perUnitText}>{carData.perUnit}</Text>
          </View>

          <View style={styles.specsGrid}>
            {carData.specs.map((spec, index) => {
            
              const IconComponent = spec.iconLibrary === 'Feather' ? Feather : MaterialCommunityIcon;
              let iconName;

              switch (spec.key) {
                case 'seats': iconName = 'phone'; break;
                case 'doors': iconName = 'car-door'; break;
                case 'manual': iconName = 'settings'; break;
                case 'ac': iconName = 'snowflake'; break;
                default: iconName = spec.icon;
              }

              return (
                <View key={index} style={styles.specRow}>
                  <IconComponent 
                    name={iconName} 
                    size={16} 
                    color="#FF7F50" 
                    style={styles.specIcon} 
                  />
                  <View style={styles.specBox}>
                    <Text style={styles.specText}>{spec.label}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        
        <View style={{ height: 100 }} /> 
      </ScrollView>
      
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}



const ORANGE = '#FF7F50';
const LIGHT_GRAY_BG = '#f8f8f8';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerButton: {
    padding: 0,
  },
  headerbutton: {
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#ccc',
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
    marginTop: 30,
  },
  
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 0,
  },
  carImage: {
    width: '100%',
    height: 180, 
  },
  
  featureBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0,

    marginHorizontal: -5, 
  },
  featureBox: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginBottom: 35,
    marginTop: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 0,
  },
  featureBoxTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 0,
    textAlign: 'left',
  },
  featureBoxSubtitle: {
    fontSize: 8,
    color: '#999',
    marginTop: 2,
  },
  
  detailSection: {
    marginTop: 20,
    marginBottom: 0,
  },
  carDetailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  priceBox: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#424141ff',
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 0,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  perUnitText: {
    fontSize: 14,
    color: '#252222ff',
  },
  

  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 60,
    justifyContent: 'space-between',
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%', 
    marginBottom: 15,
  },
  specIcon: {
    marginRight: 5,
    width: 18, 
  },
  specBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
  specText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  
  submitButton: {
    backgroundColor: ORANGE,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 0,
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'lowerCase',
  },
});