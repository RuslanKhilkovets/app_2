import {StyleSheet} from 'react-native';
import React from 'react';

import {Screen, Menu} from '@/components';

const MainScreen = () => {
  return (
    <Screen headerShown={false} backColor="#fff">
      <Menu />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
