import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {AppIcon} from '@/components';

interface IMenuItemProps {
  title: string;
  iconName: string;
}

const MenuItem = ({title, iconName}: IMenuItemProps) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <AppIcon name={iconName} size={30} />

      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
