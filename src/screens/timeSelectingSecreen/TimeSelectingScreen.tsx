import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const DayCellSize = (width - 40 - 20) / 7;


const monthDays = [
  null, null, null, null, 1, 2, 
  3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30,
  31,
];
const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DateAndTimeScreen = ( {navigation} ) => {
  const [pickUpTime, setPickUpTime] = useState('09:00');
  const [returnTime, setReturnTime] = useState('20:00');
  
  const [selectedDates, setSelectedDates] = useState([16, 17, 18, 19]);

  const getDayStatus = (day) => {
    if (day === null) return 'empty';
    if (selectedDates.includes(day)) {
      if (day === selectedDates[0] || day === selectedDates[selectedDates.length - 1]) {
        return 'start-end';
      }
      return 'in-range';
    }
    return 'default';
  };

  const CalendarDay = ({ day }) => {
    const status = getDayStatus(day);
    let cellStyle = styles.dayCell;
    let textStyle = styles.dayText;

    if (status === 'start-end') {

      cellStyle = { ...cellStyle, ...styles.dayCellSelectedStartEnd };
      textStyle = { ...textStyle, color: '#fff' };
    } else if (status === 'in-range') {
    
      cellStyle = { ...cellStyle, ...styles.dayCellInRange };
    }


    if (status === 'in-range') {
        textStyle = { ...textStyle, color: '#000' };
    }


    return (
      <TouchableOpacity
        style={cellStyle}
        onPress={() => day !== null && console.log(`Selected day: ${day}`)}
        disabled={day === null}
      >
        <Text style={textStyle}>{day}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000"  />
        </TouchableOpacity>
        <View>
        <Text style={styles.headerTitle}>Date & Time</Text>
        </View>
      </View>

      
      <View style={styles.calendarBlock}>
    
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={() => console.log('Previous month')}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.monthText}>April 2023</Text>
          <TouchableOpacity onPress={() => console.log('Next month')}>
            <Icon name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        
        <View style={styles.weekDaysRow}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.dayLabelContainer}>
              <Text style={styles.dayLabelText}>{day}</Text>
            </View>
          ))}
        </View>

    
        <View style={styles.calendarGrid}>
          {monthDays.map((day, index) => (
            <CalendarDay key={index} day={day} />
          ))}
        </View>
      </View>

    
      <View style={styles.timePickersRow}>
        
        <View style={styles.timePickerColumn}>
          <Text style={styles.timeLabel}>Pick-up time</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => console.log('Open Pick-up Time Picker')}
          >
            <Text style={styles.timeText}>{pickUpTime}</Text>
            <MaterialCommunityIcon name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>
        </View>


        <View style={styles.timePickerColumn}>
          <Text style={styles.timeLabel}>Return time</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => console.log('Open Return Time Picker')}
          >
            <Text style={styles.timeText}>{returnTime}</Text>
            <MaterialCommunityIcon name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.rentButton}
          onPress={() => navigation.navigate('BookingScreen')}
        >
          <Text style={styles.rentButtonText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateAndTimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
  height: 80,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  paddingTop: 30,
},

headerIcon: {
  position: 'absolute',
  left: 20,
  top: 30,
},

headerTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#000',
  textAlign: 'center',
},
calendarBlock: {

    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 10,
    marginTop: 20,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayLabelContainer: {
    width: DayCellSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dayCell: {
    width: DayCellSize,
    height: DayCellSize,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  dayText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  
  dayCellInRange: {
    backgroundColor: '#fde9e1',
    borderRadius: 0,
  },
  
  dayCellSelectedStartEnd: {
    backgroundColor: '#f87232', 
    borderRadius: DayCellSize / 2,
    width: DayCellSize * 0.8,
    height: DayCellSize * 0.8,
  },

  
  timePickersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  timePickerColumn: {
    width: '48%',
  },
  timeLabel: {
    fontSize: 14,
    color: '#101010ff',
    marginBottom: 8,
    fontWeight: 900,
  },
  timeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
  },
  rentButton: {
    backgroundColor: '#f87232',
    borderRadius: 15,
    paddingVertical: 13,
    alignItems: 'center',
  },
  rentButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
});



