import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ILocation} from '@/types';

interface ISelectLocationItemProps {
  location: ILocation | null;
  borderColor?: string;
  setLocation:
    | React.Dispatch<React.SetStateAction<ILocation | null>>
    | ((location: ILocation | null) => void);
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
        {location?.name || 'Локація невідома'}
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
