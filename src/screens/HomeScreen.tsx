import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Home( {navigation}: any ) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Landing')}>
        <Text style={styles.btnText}> To Landing Screen </Text>
        
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:'white',
    justifyContent: 'center', 
    alignItems: 'center' 
},

  text: { 
    fontSize: 20, 
    fontWeight: '600' 
},
button: {
      marginTop: 20,
    backgroundColor: '#FF7A00',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    elevation: 3,

},
btnText : {
    color: 'white',

}
});
