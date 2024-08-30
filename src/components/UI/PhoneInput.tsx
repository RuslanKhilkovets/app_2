import {StyleSheet} from 'react-native';
import React from 'react';

import {globals} from '@/constants';
import {Input} from '@/components';

interface IPhoneInput {
  value: string;
  onChange: () => void;
  placeholder?: string;
  error?: string;
}

const PhoneInput = ({placeholder, value, onChange, error}: IPhoneInput) => {
  return (
    <Input
      placeholder={placeholder || 'Телефон'}
      value={value}
      onChangeText={onChange}
      error={error}
      mask={globals.PHONE_MASK}
      maxLength={globals.PHONE_MASK.length}
    />
  );
};

export default PhoneInput;

const styles = StyleSheet.create({});
