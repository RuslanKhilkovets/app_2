import React from 'react';
import {AppIcon} from '@/components';
import {useGoBack} from '@/hooks';
import {TouchableOpacity} from 'react-native';

interface IGoBackProps {
  color?: string;
}
export default function GoBack({color = '#000'}: IGoBackProps) {
  const goBack = useGoBack();

  return (
    <TouchableOpacity onPress={goBack}>
      <AppIcon name="back" size={28} color={color} />
    </TouchableOpacity>
  );
}
