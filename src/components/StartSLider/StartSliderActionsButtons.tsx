import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';

import {Button} from '@/components';
import {slidesLength} from '../slides';

interface IStartSliderActionsButtonsProps {
  onNext: () => void;
  activeSlide: number;
}

const StartSliderActionsButtons = ({
  onNext,
  activeSlide,
}: IStartSliderActionsButtonsProps) => {
  const lastSlide = activeSlide === slidesLength - 1;
  const navigation = useNavigation();

  const onNavigateToRegister = () => {
    navigation.navigate('SignForms', {action: 'register'});
  };

  return (
    <View style={styles.buttonsContainer}>
      {!lastSlide && (
        <Button type="primary" onPress={onNext}>
          Далі
        </Button>
      )}

      <Button
        style={lastSlide ? styles.lastSlide : undefined}
        type={lastSlide ? 'primary' : 'secondary'}
        onPress={onNavigateToRegister}>
        Перейти до реєстрації
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  lastSlide: {
    marginBottom: 50,
  },
});

export default StartSliderActionsButtons;
