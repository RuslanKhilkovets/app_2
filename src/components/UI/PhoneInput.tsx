import React from 'react';

import {globals} from '@/constants';
import {Input} from '@/components';

interface IPhoneInput {
  value: string;
  onChange: (() => void) | ((text: string) => void);
  placeholder?: string;
  error?: string;
  label?: string;
}

const PhoneInput = ({
  placeholder,
  value,
  onChange,
  error,
  label,
}: IPhoneInput) => {
  return (
    <Input
      label={label}
      placeholder={placeholder || 'Телефон'}
      value={value}
      onChangeText={onChange}
      error={error}
      mask={globals.PHONE_MASK}
      maxLength={globals.PHONE_MASK.length}
      keyboardType="numeric"
    />
  );
};

export default PhoneInput;
