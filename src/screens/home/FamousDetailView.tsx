import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface FamousItem {
  id: number;
  name: string;
  detail: string;
  image: any; // string key from API or require(...)
  price: string;
}

interface FamousDetailViewProps {
  categories: string[];
  items: FamousItem[];
}

// Map image keys from API/db.json to actual require() calls
const famousImageMap: Record<string, any> = {
  'white.png': require('../../assets/homeCars/homeAgenciesImages/white.png'),
  'famous3.png': require('../../assets/homeCars/homeAgenciesImages/famous3.png'),
  'Car2.png': require('../../assets/homeCars/homeAgenciesImages/Car2.png'),
  'agency2.png': require('../../assets/homeCars/homeAgenciesImages/agency2.png'),
  'agency7.png': require('../../assets/homeCars/homeAgenciesImages/agency7.png'),
};

const FamousDetailView: React.FC<FamousDetailViewProps> = ({ categories, items }) => {
    const [activeCategory, setActiveCategory] = useState('All');

    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}> Categories </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.subCategoryButton,
                            activeCategory === cat && styles.activeSubCategoryButton,
                        ]}
                        onPress={() => setActiveCategory(cat)}
                    >
                        <Text
                            style={[
                                styles.subCategoryText,
                                activeCategory === cat && styles.activeSubCategoryText,
                            ]}
                        >
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.itemScroll}>
                {items.map((item) => {
                    const source =
                      typeof item.image === 'string'
                        ? famousImageMap[item.image] || famousImageMap['white.png']
                        : item.image;

                    return (
                    <TouchableOpacity key={item.id} style={styles.itemCard}>
                       
                        <Image source={source} style={styles.itemImage} />
                        
                        <View style={styles.detailBody}>
                            <Text style={styles.itemNameText} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.itemDetailText}>{item.detail}</Text>
                        </View>
                         {/* <View style={styles.priceOverlay}>
                            <Text style={styles.priceText}>{item.price}</Text>
                        </View> */}
                    </TouchableOpacity>
                )})}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
    },
    categoryTitle: {
        fontSize: 14,
        fontWeight: '900',
        marginBottom: 5,
        color: '#333',
    },
    categoryScroll: {
        marginBottom: 5,
    },
   
    subCategoryButton: {
        paddingHorizontal: 15,
        paddingVertical: 4,
        borderRadius: 15,
        backgroundColor: '#F0F0F0',
        marginRight: 10,
    },
    activeSubCategoryButton: {
        backgroundColor: '#FF7A001A', 
        borderWidth: 0,
        borderColor: '#FF7A00',
    },
    subCategoryText: {
        color: 'gray',
        fontSize: 14,
    },
    activeSubCategoryText: {
        fontWeight: 'bold',
        color: '#FF7A00',
    },
    
    itemScroll: {
        paddingBottom: 0,
    },
    itemCard: {
        width: 86,
        height: 100,
        borderRadius: 15,
        marginRight: 15,
        backgroundColor: 'white',
        overflow: 'hidden',
        elevation: 0, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    itemImage: {
        width: 86,
        height: 100, 
        resizeMode: 'cover',
    },
    detailBody: {
        padding: 10,
        height: '40%',
        justifyContent: 'space-around',
    },
    itemNameText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    itemDetailText: {
        fontSize: 12,
        color: 'gray',
    },
    priceOverlay: {
        position: 'absolute',
        top: 10,
        right: 0,
        backgroundColor: '#FF7A00', 
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    priceText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    }
});

export default FamousDetailView;