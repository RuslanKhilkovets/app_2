import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {AppIcon} from '@/components';
import {useGoBack} from '@/hooks';
interface IGoBackProps {
  color?: string;
}
export default function GoBack({color = '#000'}: IGoBackProps) {
  const navigation = useNavigation();

  const goBack = useGoBack();

  return (
    navigation.canGoBack() && (
      <TouchableOpacity onPress={goBack}>
        <AppIcon name="back" size={28} color={color} />
      </TouchableOpacity>
    )
  );
}
