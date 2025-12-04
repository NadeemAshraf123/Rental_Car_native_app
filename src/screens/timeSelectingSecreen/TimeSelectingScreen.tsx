import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

const { width } = Dimensions.get('window');
const DayCellSize = (width - 40 - 20) / 7;

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const timeOptions = [
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00',
];

const TimeSelectingScreen = ({ navigation }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [pickUpTime, setPickUpTime] = useState('09:00');
  const [returnTime, setReturnTime] = useState('20:00');

  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [selectingType, setSelectingType] = useState('pickup'); 

  const generateCalendar = () => {
    const daysInMonth = currentMonth.daysInMonth();
    const firstDayIndex = currentMonth.startOf('month').day();

    let arr = [];
    for (let i = 0; i < firstDayIndex; i++) arr.push(null);
    for (let i = 1; i <= daysInMonth; i++) arr.push(i);

    return arr;
  };

  const monthDays = generateCalendar();

  const getDayStatus = (day) => {
    if (!day) return 'empty';
    const date = currentMonth.date(day);

    if (!startDate && !endDate) return 'default';

    if (startDate && date.isSame(startDate, 'day')) return 'start-end';
    if (endDate && date.isSame(endDate, 'day')) return 'start-end';

    if (
      startDate &&
      endDate &&
      date.isAfter(startDate, 'day') &&
      date.isBefore(endDate, 'day')
    ) {
      return 'in-range';
    }

    return 'default';
  };

  const handleSelectDay = (day) => {
    if (!day) return;

    const selected = currentMonth.date(day);

    if (!startDate || (startDate && endDate)) {
      setStartDate(selected);
      setEndDate(null);
      return;
    }

    if (selected.isAfter(startDate)) {
      setEndDate(selected);
    } else {
      setStartDate(selected);
      setEndDate(null);
    }
  };

  const CalendarDay = ({ day }) => {
    const status = getDayStatus(day);
    let cell = styles.dayCell;
    let text = styles.dayText;

    if (status === 'start-end') {
      cell = { ...cell, ...styles.dayCellSelectedStartEnd };
      text = { ...text, color: '#fff' };
    } else if (status === 'in-range') {
      cell = { ...cell, ...styles.dayCellInRange };
      text = { ...text, color: '#000' };
    }

    return (
      <TouchableOpacity
        style={cell}
        disabled={!day}
        onPress={() => handleSelectDay(day)}
      >
        <Text style={text}>{day}</Text>
      </TouchableOpacity>
    );
  };

  const openTimeSelector = (type) => {
    setSelectingType(type);
    setTimeModalVisible(true);
  };

  const handleSelectTime = (time) => {
    if (selectingType === 'pickup') setPickUpTime(time);
    else setReturnTime(time);

    setTimeModalVisible(false);
  };

  return (
    <View style={styles.container}>

      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Date & Time</Text>
      </View>

      <View style={styles.calendarWrapper}>

      
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.monthText}>{currentMonth.format('MMMM YYYY')}</Text>

          <TouchableOpacity onPress={() => setCurrentMonth(currentMonth.add(1, 'month'))}>
            <Icon name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>
        </View>

      
        <View style={styles.weekDaysRow}>
          {weekDays.map((d, i) => (
            <Text key={i} style={styles.weekDay}>{d}</Text>
          ))}
        </View>

        
        <View style={styles.calendarGrid}>
          {monthDays.map((day, index) => (
            <CalendarDay key={index} day={day} />
          ))}
        </View>
      </View>

      
      <View style={styles.timeRow}>

        
        <View style={styles.timeColumn}>
          <Text style={styles.timeLabel}>Pick-up time</Text>

          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => openTimeSelector('pickup')}
          >
            <Text style={styles.timeText}>{pickUpTime}</Text>
            <MaterialCommunityIcon name="chevron-down" size={22} color="#777" />
          </TouchableOpacity>
        </View>

        
        <View style={styles.timeColumn}>
          <Text style={styles.timeLabel}>Return time</Text>

          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => openTimeSelector('return')}
          >
            <Text style={styles.timeText}>{returnTime}</Text>
            <MaterialCommunityIcon name="chevron-down" size={22} color="#777" />
          </TouchableOpacity>
        </View>

      </View>

      <TouchableOpacity
        style={styles.rentButton}
        onPress={() => {
          navigation.navigate({
            name: 'CarsDetailScreen',
            params: {
              selectedData: {
                startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
                endDate: endDate ? endDate.format("YYYY-MM-DD") : null,
                pickUpTime,
                returnTime
              }
            },
            merge: true, 
          });
        }}
      >
        <Text style={styles.rentButtonText}>Rent Now</Text>
      </TouchableOpacity>

     
      <Modal visible={timeModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.timeModalBox}>
            <FlatList
              data={timeOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.timeOption}
                  onPress={() => handleSelectTime(item)}
                >
                  <Text style={styles.timeOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default TimeSelectingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /** HEADER */
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

  /** CALENDAR WRAPPER */
  calendarWrapper: {
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

  /** MONTH NAVIGATION */
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  /** WEEKDAYS */
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDay: {
    width: DayCellSize,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#999',
  },

  /** CALENDAR GRID */
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

  /** HIGHLIGHTED DAYS */
  dayCellInRange: {
    backgroundColor: '#fde9e1',
    borderRadius: 0,
  },
  dayCellSelectedStartEnd: {
    backgroundColor: '#f87232',
    borderRadius: DayCellSize / 2,
    width: DayCellSize * 0.8,
    height: DayCellSize * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /** TIME PICKER ROW */
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  timeColumn: {
    width: '48%',
  },
  timeLabel: {
    fontSize: 14,
    color: '#101010',
    marginBottom: 8,
    fontWeight: '900',
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

  /** TIME DROPDOWN MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeModalBox: {
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    maxHeight: 320,
  },
  timeOption: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  timeOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },

  /** RENT BUTTON */
  rentButton: {
    backgroundColor: '#f87232',
    borderRadius: 15,
    paddingVertical: 13,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 25,
  },
  rentButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
});




