import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../redux/rentalbookingslice/RentalBookingSlice';

const BookingScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const { car, startDate, endDate, pickUpTime, returnTime } = route.params;

  const userId = "TEMP_USER_01"; 

  const booking = {
    id: Date.now().toString(),
    carId: car.id,
    carName: car.name,
    carImage: car.image,
    pricePerDay: car.price,
    startDate,
    endDate,
    pickUpTime,
    returnTime,
    bookedBy: userId,
    createdAt: new Date().toISOString()
  };

  useEffect(() => {
    dispatch(createBooking(booking));
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(true);

  const bookingDetails = {
    bookingId: booking.id,
    car: {
      make: car.name,
      modelYear: 2021,
      image: 'https://via.placeholder.com/150x80?text=Car',
    },
    pickupDate: startDate,
    returnDate: endDate,
    pickupLocation: 'Chlef',
    rentingDays: 3,
    totalPrice: (car.price * 3).toString(),
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}
                  keyboardShouldPersistTaps="handled">

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Booking</Text>
        </View>

        <View style={styles.bookingCard}>
          <Text style={styles.bookingIdText}>Your Booking : {bookingDetails.bookingId}</Text>

          <View style={styles.carDetailsRow}>
            <Image source={{ uri: bookingDetails.car.image }} style={styles.carImage} resizeMode="contain" />
            <View style={styles.carInfo}>
              <Text style={styles.carName}>{bookingDetails.car.make} - {bookingDetails.car.modelYear}</Text>

              <View style={styles.infoLine}>
                <MaterialCommunityIcon name="calendar" size={16} color="#666" />
                <Text style={styles.infoText}>{bookingDetails.pickupDate} - {bookingDetails.returnDate}</Text>
              </View>

              <View style={styles.infoLine}>
                <MaterialCommunityIcon name="map-marker" size={16} color="#666" />
                <Text style={styles.infoText}>Pickup Location: {bookingDetails.pickupLocation}</Text>
              </View>

            </View>
          </View>
        </View>

        <View style={styles.rentingTimeBox}>
          <MaterialCommunityIcon name="clock-time-four-outline" size={24} color="#000" />
          <Text style={styles.rentingTimeLabel}>Renting Time</Text>
          <Text style={styles.rentingTimeValue}>{bookingDetails.rentingDays} Days</Text>
        </View>

        <View style={styles.totalSection}>
          <View style={styles.totalTextContainer}>
            <Text style={styles.totalLabel}>Total <Text style={styles.totalDays}>({bookingDetails.rentingDays} days)</Text></Text>
            <Text style={styles.totalPrice}>{bookingDetails.totalPrice} Da</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('CarsDetailScreen')}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkoutButton} onPress={() => setIsModalVisible(true)}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={styles.successIconBackground}>
              <MaterialCommunityIcon name="check" size={70} color="#fff" />
            </View>

            <Text style={styles.modalText}>Booking Successful</Text>

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButtonDone}
                onPress={() => {
                  setIsModalVisible(false);
                  navigation.navigate('CarsDetailScreen');
                }}
              >
                <Text style={styles.modalButtonDoneText}>Done</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookingScreen;

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
  },
  headerIcon: {
    position: 'absolute',
    left: 20,
    padding: 5,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#c1c1c1ff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },

  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 0,
  },
  bookingIdText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 35,
  },
  carDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carImage: {
    width: 100,
    height: 60,
    marginRight: 25,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 5,
  },
  infoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },

  rentingTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffe8d9',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginHorizontal: 20,
    marginTop: 40,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  rentingTimeLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 10,
  },
  rentingTimeValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  totalSection: {
    marginHorizontal: 20,
    marginTop: 40,
    alignItems: 'center',
  },
  totalTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  totalDays: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f87232',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#f8a883ff',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0d0d0dff',
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: '#f87232',
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },

  //   modal

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  successIconBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f87232',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalButtonDone: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  modalButtonDoneText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f87232',
  },
});
