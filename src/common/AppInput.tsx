import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Pressable,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type AppInputProps = TextInputProps & {
  icon?: string;
  containerStyle?: ViewStyle;
  roundedIcon?: boolean;
  error?: string;
  showToggle?: boolean;
};

export default function AppInput({
  icon,
  containerStyle,
  roundedIcon,
  error,
  showToggle,
  secureTextEntry,
  ...props
}: AppInputProps) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={[styles.container, containerStyle]}>
      {icon &&
        (roundedIcon ? (
          <View style={styles.iconWrapper}>
            <Icon name={icon} size={18} color="#000" />
          </View>
        ) : (
          <Icon name={icon} size={18} color="#000" style={{marginRight: 10}} />
        ))}

      <TextInput 
                style={styles.input}
                 placeholderTextColor="#999"
                 secureTextEntry={isSecure}
                 {...props} 
            />

        {showToggle && (
          <Pressable onPress={() => setIsSecure(!isSecure)}>
            <Icon 
                 name={isSecure ? 'eye-off' : 'eye'}
                 size= {15}
                 color= 'black'
                 style={{ marginLeft: 8 }}
              />
          </Pressable>
        )}

        {error && <Text style={styles.errorText}> {error} </Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 16,
    backgroundColor: '#fff',
    width: '80%',
  },
  icon: {
    // marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#989595ff',
  },
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  errorText: {
    position: 'absolute',
    bottom: -18,
    left: 12,
    fontSize: 12,
    color: 'red',
  }
});
