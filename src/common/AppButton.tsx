import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type AppButtonProps = {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

export default function AppButton({ 
    label,
    onPress,
    variant = 'primary',
    disabled = false,
    loading= false,
    fullWidth = false,
    style,
    textStyle,
    
}: AppButtonProps) {

    const baseStyle = [styles.button, fullWidth && styles.fullWidth, style];
    const variantStyle = 

    variant === 'primary' ? styles.primary : variant === 'secondary' ? styles.secondary : styles.ghost;

    return (
        <Pressable
          style={({ pressed }) => [
            ...baseStyle,
            variantStyle,
            disabled && styles.disabled,
            pressed && styles.pressed
          ]}
          onPress={onPress}
          disabled={disabled || loading}
          >
            <Text style={[styles.text, variant === 'ghost' && styles.ghostText, textStyle]}>
            {loading ? 'loading...' : label}

        
        </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 15,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,

    },
    fullWidth: {
        alignSelf: 'stretch',
    },
    primary: {
        backgroundColor: '#FF7A00',
    },
    secondary: {
        backgroundColor: '#333',
    },
    ghost: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#fff',
    },
    text: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '900',
    },
    ghostText: {
        color: '#fff',
    },
    disabled: {
        opacity: 0.6,
    },
    pressed: {
        transform: [{ scale: 0.98 }],
    },

});


