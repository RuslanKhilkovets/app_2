import React from 'react';

import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import ICustomButtonProps from '../../types/CustomButton';


const CustomButton = ({ children, type = "primary", onPress, style, after = <></>, before = <></> }: ICustomButtonProps) => {
    const textColor = type === "primary" ? '#fff' : '#000';

    return (
        <TouchableOpacity 
            style={[
                styles.button, 
                styles[type], 
                style, 
                type === "bordered" && {
                    borderWidth: 1,
                    borderColor: "#000",
                    borderStyle: "solid"
                }
            ]} 
            activeOpacity={.7} 
            onPress={onPress}
        >
            {before}

            <Text style={[styles.buttonText, { color: textColor }]}>
                {children}
            </Text>

            {after}

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
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
        fontFamily: "Raleway-Medium"
    },
});

export default CustomButton;
