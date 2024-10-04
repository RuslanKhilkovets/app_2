import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ILocation} from '@/types';
import {defaultLocation} from '@/constants/globals';

interface ISelectLocationItemProps {
  location: ILocation | null;
  borderColor?: string;
  setLocation: React.Dispatch<React.SetStateAction<ILocation | null>>;
}

const SelectLocationItem = ({
  location,
  borderColor,
  setLocation,
}: ISelectLocationItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => setLocation(location)}
      activeOpacity={0.7}
      style={[
        styles.currentLocationContainer,
        {borderBottomColor: borderColor || '#E7E3E3'},
      ]}>
      <Text style={styles.currentLocationText}>
        {location?.name || defaultLocation}
      </Text>
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
