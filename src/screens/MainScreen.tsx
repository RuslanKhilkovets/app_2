import {StyleSheet} from 'react-native';
import React from 'react';

import {Screen, Menu, Categories} from '@/components';

const MainScreen = () => {
  return (
    <Screen headerShown={false} backColor="#fff">
      <Categories />
      <Menu />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
