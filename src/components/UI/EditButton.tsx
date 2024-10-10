import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import {AppIcon} from '@/components';
import {useTheme} from '@/contexts/Theme/ThemeContext';

interface IEditButtonProps {
  title: string;
  onPress: () => void;
  error?: string;
}

const EditButton = ({title, onPress, error}: IEditButtonProps) => {
  const {themes, colorScheme} = useTheme();

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          {backgroundColor: themes[colorScheme].bgSecondary},
        ]}
        activeOpacity={0.7}>
        <Text style={[styles.text, {color: themes[colorScheme].dark}]}>
          {title}
        </Text>

        <AppIcon name="arrow" size={10} />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
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
  errorText: {
    color: '#ff0000',
    marginVertical: 5,
    fontFamily: 'Raleway-Regular',
  },
});
