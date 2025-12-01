import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {createAgencyCar} from '../../redux/agencycarSlice/agencyCarsSlice';

export default function AddNewCarScreen({navigation, route}: any) {
  const dispatch = useDispatch();

  const { agencyId } = route.params;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [features, setFeatures] = useState([
    {icon: 'automatic', text: ''},
    {icon: 'doors', text: ''},
    {icon: 'mileage', text: ''},
    {icon: 'ac', text: ''},
  ]);

  const handleSubmit = async () => {
    if (!name || !image || features.some(f => !f.text)) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newCar = { name, image, features };

    await dispatch(createAgencyCar({ agencyId, carData: newCar }));

    setName('');
    setImage('');
    setFeatures([
      { icon: 'automatic', text: '' },
      { icon: 'doors', text: '' },
      { icon: 'mileage', text: '' },
      { icon: 'ac', text: '' },
    ]);

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add new Car</Text>

      <Text style={styles.label}>carName</Text>
      <TextInput
        style={styles.input}
        placeholder="Car Name"
        placeholderTextColor="#828080ff"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>carImage</Text>
      <TextInput
        style={styles.input}
        placeholder="Image Filename (e.g. white.png)"
        placeholderTextColor="#828080ff"
        value={image}
        onChangeText={setImage}
      />

      {features.map((feature, index) => (
        <View key={index} style={{marginBottom: 12}}>
          <Text style={styles.label}>
            {feature.icon === 'automatic' && 'Transmission'}
            {feature.icon === 'doors' && 'Doors'}
            {feature.icon === 'mileage' && 'Mileage'}
            {feature.icon === 'ac' && 'Air Conditioning'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder={`Enter ${feature.icon}`}
            placeholderTextColor="#999696ff"
            value={feature.text}
            onChangeText={text => {
              const updated = [...features];
              updated[index].text = text;
              setFeatures(updated);
            }}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Car</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: 'white'},
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '900', color: '#333', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  button: { backgroundColor: '#F9864A', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
