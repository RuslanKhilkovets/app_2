import React, {useState} from 'react';

import {View, StyleSheet} from 'react-native';

import {StartSlider, StartSliderActionsButtons} from '@/components';
import {slidesLength} from '../components/slides';

const StartSliderScreen = () => {
  return (
    <View style={styles.container}>
      <StartSlider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StartSliderScreen;
