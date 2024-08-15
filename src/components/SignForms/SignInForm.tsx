import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';

import CustomInput from '../UI/CustomInput';
import CustomButton from '../UI/CustomButton';

import ISignData from '../../types/ISignData';


const SignInForm = () => {
    const [signData, setSignData] = useState({
        email: "",
        password: ""
    });

    const onInputChange = (name: string) => (text: string) => {
        setSignData((prev: ISignData) => {
            return {
                ...prev,
                [name]: text
            }
        })
    }

    const onSignIn = () => {
        console.log("sign in")
    }

    const onForgetPassword = () => {
        console.log("ForgetPassword")
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <CustomInput
                    placeholder='E-mail'
                    value={signData.email}
                    onChangeText={onInputChange("email")}
                />
                <CustomInput
                    placeholder='Пароль'
                    value={signData.password}
                    onChangeText={onInputChange("password")}
                    secureTextEntry
                />
            </View>

            <CustomButton
                type='secondary'
                onPress={onForgetPassword}
            >
                Забули пароль?
            </CustomButton>
            
            <CustomButton
                type='primary'
                onPress={onSignIn}
            >
                Увійти
            </CustomButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputs: {
        gap: 14
    }
})

export default SignInForm;
