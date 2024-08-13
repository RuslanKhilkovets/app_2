import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from './UI/CustomButton';
import IStartSliderActionsButtonsProps from '../types/IStartSliderActionsButtonsProps';
import { slidesLength } from './slides';

const StartSliderActionsButtons = ({ onNext, activeSlide }: IStartSliderActionsButtonsProps) => {
    const lastSlide = activeSlide === slidesLength - 1;

    return (
        <View style={styles.buttonsContainer}>
            {!lastSlide && (
                <CustomButton type='primary' onPress={onNext}>
                    Далі
                </CustomButton>
            )}

            <CustomButton
                style={lastSlide ? styles.lastSlide : null}
                type={lastSlide ? 'primary' : 'secondary'}
            >
                Перейти до реєстрації
            </CustomButton>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    lastSlide: {
        marginBottom: 50
    }
});

export default StartSliderActionsButtons;
