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

export interface CarItem {
  id: number;
  name: string;
  image: any; // will accept a mapped require(...) or string key from API
  rating: number;
}

interface CarsDetailViewProps {
  categories: string[];
  items: CarItem[];
}

// Map image keys from API/db.json to actual require() calls
const carImageMap: Record<string, any> = {
  'Car1.png': require('../../assets/homeCars/Car1.png'),
  'Car2.png': require('../../assets/homeCars/Car2.png'),
  'Car3.png': require('../../assets/homeCars/Car3.png'),
  'cars.png': require('../../assets/homeCars/homeAgenciesImages/cars.png'),
};

const CarsDetailView: React.FC<CarsDetailViewProps> = ({ categories, items }) => {
  const [activeCategory, setActiveCategory] = React.useState('All');
    const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.categoryTitle}>Catagories</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}>
        {categories.map(cat => (
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
        {items.map(item => {
          const source =
            typeof item.image === 'string'
              ? carImageMap[item.image] || carImageMap['Car1.png']
              : item.image;

          return (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            onPress={() => {
              (navigation as any).navigate('CarsDetailScreen', { car: item });
            }}>
            <View style={styles.itemCard}>
              <Image source={source} style={styles.itemImage} />
              <Text>Item: {item.name}</Text>
            </View>
          </TouchableOpacity>
        )})}
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
