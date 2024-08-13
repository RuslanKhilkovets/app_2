import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from './UI/CustomButton';

const StartSliderActionsButtons = () => {
    return (
        <View style={styles.buttonsContainer}>
            <CustomButton type='primary'>
                Далі
            </CustomButton>
            <CustomButton type='secondary'>
                Перейти до реєстрації
            </CustomButton>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
})


export default StartSliderActionsButtons;