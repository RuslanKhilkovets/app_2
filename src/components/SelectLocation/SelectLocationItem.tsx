import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

interface ISelectLocationItemProps {
  location: string;
  borderColor?: string;
}

const SelectLocationItem = ({
  location,
  borderColor,
}: ISelectLocationItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.currentLocationContainer,
        {borderBottomColor: borderColor || '#E7E3E3'},
      ]}>
      <Text style={styles.currentLocationText}>{location}</Text>
    </TouchableOpacity>
  );
};

export default SelectLocationItem;

const styles = StyleSheet.create({
  currentLocationContainer: {
    marginTop: 15,
    borderBottomWidth: 1,
  },
  currentLocationText: {
    fontFamily: 'Raleway-Regular',
    color: '#000',
    fontSize: 15,
    paddingBottom: 16,
  },
});
