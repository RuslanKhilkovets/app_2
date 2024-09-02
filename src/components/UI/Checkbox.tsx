import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface ICheckBoxProps {
  checked: boolean;
  label: string;
  value: any;
  onValueChange: (value: string | number) => void;
}

const CheckBox: React.FC<ICheckBoxProps> = ({
  label,
  value,
  onValueChange,
  checked,
}) => {
  
  const handlePress = () => {
    onValueChange(value);
  };

  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={handlePress}
      activeOpacity={0.7}>
      <View style={[styles.checkbox]}>
        {checked && (
          <View style={[styles.checkboxInner, checked && styles.selected]} />
        )}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    height: 25,
    width: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#AFAFAF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#000',
  },
  checkboxInner: {
    height: 10,
    width: 10,
    backgroundColor: '#FFF',
  },
  checkboxLabel: {
    marginLeft: 15,
    fontSize: 15,
    color: '#000',
    fontFamily: 'Raleway-Regular',
  },
});
