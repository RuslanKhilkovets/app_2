import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import ICustomButtonProps from '../../types/CustomButton';

const CustomButton = ({ children, type = "primary", onPress, style }: ICustomButtonProps) => {
    const textColor = type === "primary" ? '#fff' : '#000';

    return (
        <TouchableOpacity 
            style={[styles.button, styles[type], style]} 
            activeOpacity={.7} 
            onPress={onPress}
        >
            <Text style={[styles.buttonText, { color: textColor }]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 16,
        padding: 21,
    },
    primary: {
        backgroundColor: '#000',
    },
    secondary: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontSize: 16,
    },
});

export default CustomButton;
