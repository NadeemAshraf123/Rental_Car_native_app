
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';



const AGENCY_CATEGORIES = ['All', 'LOVEHA', 'MAGI Car', 'ARC', 'Deficar', 'Aymen car'];
const AGENCY_ITEMS = [
    { id: 1, name: 'ARC Rental', image: require('../../assets/homeCars/homeAgenciesImages/agency1.png'), rating: 4.8 },
    { id: 2, name: 'MAGI Car', image: require('../../assets/homeCars/homeAgenciesImages/agency2.png'), rating: 4.5 },
    { id: 3, name: 'Deficar Agency', image: require('../../assets/homeCars/homeAgenciesImages/agency6.png'), rating: 4.2 },
    { id: 4, name: 'Aymen Rentals', image: require('../../assets/homeCars/homeAgenciesImages/agency44.png'), rating: 4.7 },
    { id: 5, name: 'Autos VIP', image: require('../../assets/homeCars/homeAgenciesImages/agency1.png'), rating: 4.9 },
];

const AgenciesDetailView = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}> Catagories</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                {AGENCY_CATEGORIES.map((cat) => (
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

            {/* Main Horizontal Content (Agency Cards) */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.itemScroll}>
                {AGENCY_ITEMS.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.itemCard}>
                        {/* Image Container with Text Overlay */}
                        <Image source={item.image} style={styles.itemImage} />
                        
                        {/* Text Overlay for Agency Name */}
                        <View style={styles.textOverlay}>
                            <Text style={styles.agencyNameText}>{item.name}</Text>
                        </View>

                        {/* Rating/Details Block - Positioned at the bottom of the card area */}
                        <View style={styles.detailsFooter}>
                            <Text style={styles.ratingText}>⭐️ {item.rating} Rating</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
    },
    categoryTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#333',
    },
    categoryScroll: {
        marginBottom: 15,
    },

    subCategoryButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        backgroundColor: '#F0F0F0',
        marginRight: 10,
    },
    activeSubCategoryButton: {
        backgroundColor: '#FF7A001A',
        borderWidth: 0.5,
        borderColor: '#FF7A00',
    },
    subCategoryText: {
        color: 'gray',
        fontSize: 12,
    },
    activeSubCategoryText: {
        fontWeight: 'bold',
        color: '#FF7A00',
    },

    itemScroll: {
        paddingBottom: 0, 
    },
    itemCard: {
        width: 80, 
        height: 100,
        borderRadius: 13,
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
        width: 80,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 15,
    },
    textOverlay: {
        position: 'absolute',
        top: 10, 
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark background for contrast
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    agencyNameText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    detailsFooter: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: '25%', // Footer takes 25% of card height
    },
    ratingText: {
        fontSize: 14,
        color: '#FF7A00',
        fontWeight: '600',
    }
});

export default AgenciesDetailView;