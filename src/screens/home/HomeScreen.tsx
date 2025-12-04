import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, ActivityIndicator, Text } from 'react-native';
import HeaderBar from './HeaderBar';
import { ScrollView } from 'react-native';
import ContentPanel from './ContentPanel';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { fetchHomeData } from '../../redux/homeSlice';

const MAP_HEIGHT = 350;
const SPACER_HEIGHT = 300;

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    carCategories,
    cars,
    agencyCategories,
    agencies,
    famousCategories,
    famousItems,
    loading,
    error,
  } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const isDataReady =
    carCategories.length > 0 ||
    cars.length > 0 ||
    agencyCategories.length > 0 ||
    agencies.length > 0 ||
    famousCategories.length > 0 ||
    famousItems.length > 0;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/homeCars/map.jpg')}
        style={styles.mapBackground}
        resizeMode="cover"
      >
        <HeaderBar />
      </ImageBackground>

      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapSpacer} />

        {loading && !isDataReady ? (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#F9864A" />
          </View>
        ) : error && !isDataReady ? (
          <View style={{ paddingVertical: 80, alignItems: 'center' }}>
            <Text style={{ color: 'red' }}>{error}</Text>
          </View>
        ) : (
          <ContentPanel
            carCategories={carCategories}
            carItems={cars}
            agencyCategories={agencyCategories}
            agencyItems={agencies}
            famousCategories={famousCategories}
            famousItems={famousItems}
          />
        )}

      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  mapBackground: {
    width: '100%',
    height: MAP_HEIGHT,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  mapSpacer: {
    height: SPACER_HEIGHT,
  },
  scrollContentContainer: {
    flexGrow: 1, 
    zIndex: 2,
  },


  content: {
    paddingBottom: 24,
  },

  sectionTitleWrapper: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  sectionTitle: { 
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7A00',
  },
  CarBtn: {
    padding: 10,
    marginBottom: 5,
    flexDirection: 'row',
    gap: 50,
  },
  btn: {
    backgroundColor: '#F9864A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,


  }
});
