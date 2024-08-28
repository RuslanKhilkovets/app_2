import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import {AppIcon} from '@/components';

interface IEditButtonProps {
  title: string;
  onPress: () => void;
}

const EditButton = ({title, onPress}: IEditButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}>
      <Text style={styles.text}>{title}</Text>

      <AppIcon name="arrow" size={10} />
    </TouchableOpacity>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  container: {
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F6F6',
    borderRadius: 10,
  },
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
  },
});
