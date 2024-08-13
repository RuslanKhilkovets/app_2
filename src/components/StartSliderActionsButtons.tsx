import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from './UI/CustomButton';
import IStartSliderActionsButtonsProps from '../types/IStartSliderActionsButtonsProps';


const StartSliderActionsButtons = ({ onNext }: IStartSliderActionsButtonsProps) => {
  return (
        <View style={styles.buttonsContainer}>
            <CustomButton type='primary' onPress={onNext}>
                Далі
            </CustomButton>
            <CustomButton type='secondary' onPress={() => {}}>
                Перейти до реєстрації
            </CustomButton>
        </View>
  );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        backgroundColor: "#FFEAEA",
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});

export default StartSliderActionsButtons;
