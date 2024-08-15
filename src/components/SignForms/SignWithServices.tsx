import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import SignTypes from '../../constants/SignTypes';
import ISignWithServicesProps from '../../types/ISignWithServicesProps';

import GoogleLogo from "../../../assets/images/Google.svg";
import FacebookLogo from "../../../assets/images/Facebook.svg";


const SignWithServices = ({type}: ISignWithServicesProps) => {
    return (
        <View style={[styles.container, {
            paddingTop: type === SignTypes.SIGN_IN ? 80 : 0,
        }]}>
            <Text style={styles.title}>
                Увійти за допомогою:
            </Text>

            <TouchableOpacity style={styles.iconContainer} activeOpacity={.7}>
                <GoogleLogo/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} activeOpacity={.7}>
                <FacebookLogo/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 13,
        paddingBottom: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
    },
    title: {
        fontSize: 15,
        fontFamily: "Raleway-Medium",
        color: "#000",
    },
    iconContainer: {
        backgroundColor: "#fff",
        padding: 13,
        borderRadius: 10
    }
})

export default SignWithServices;