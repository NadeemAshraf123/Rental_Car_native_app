import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CAR_CATEGORIES = [
  'All',
  'Peugeot',
  'Hyundai',
  'Audi',
  'KIA',
  'Toyota Hilux',
];

const CAR_ITEMS = [
  {
    id: 1,
    name: 'Sedan',
    image: require('../../assets/homeCars/Car3.png'),
    rating: 5,
  },
  {
    id: 2,
    name: 'SUV',
    image: require('../../assets/homeCars/Car2.png'),
    rating: 4,
  },
  {
    id: 3,
    name: 'Hatchback',
    image: require('../../assets/homeCars/Car1.png'),
    rating: 3,
  },
  {
    id: 4,
    name: 'Convertible',
    image: require('../../assets/homeCars/homeAgenciesImages/cars.png'),
    rating: 5,
  },
  {
    id: 5,
    name: 'Coupe',
    image: require('../../assets/homeCars/homeAgenciesImages/cars.png'),
    rating: 4,
  },
];

const CarsDetailView = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
    const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.categoryTitle}>Catagories</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}>
        {CAR_CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.subCategoryButton,
              activeCategory === cat && styles.activeSubCategoryButton,
            ]}
            onPress={() => setActiveCategory(cat)}>
            <Text
              style={[
                styles.subCategoryText,
                activeCategory === cat && styles.activeSubCategoryText,
              ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.itemScroll}>
        {CAR_ITEMS.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            onPress={() =>
              navigation.navigate('CarsDetailScreen', {car: item})
            }>
            <View style={styles.itemCard}>
              <Image source={item.image} style={styles.itemImage} />
              <Text>Item: {item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 0,
    padding: 5,
  },
  categoryScroll: {
    marginBottom: 5,
  },
  subCategoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: 'white',
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: '#F0F0F0',
  },
  activeSubCategoryButton: {
    backgroundColor: '#FF7A001A',
  },
  subCategoryText: {
    color: 'black',
  },
  activeSubCategoryText: {
    fontWeight: 'bold',
    color: '#FF7A00',
  },

  itemScroll: {
    paddingBottom: 20,
  },
  itemCard: {
    height: 100,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
    backgroundColor: 'white',
  },
  itemImage: {
    width: 80,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 15,
  },
});

export default CarsDetailView;
