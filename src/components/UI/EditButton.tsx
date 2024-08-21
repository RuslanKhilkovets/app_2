import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import {AppIcon} from '@/components';

interface IEditButtonProps {
  title: string;
  onPress: () => void;
}

const EditButton = ({title, onPress}: IEditButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>{title}</Text>

      <AppIcon name="arrow" />
    </TouchableOpacity>
  );
};

export default EditButton;

const styles = StyleSheet.create({});
