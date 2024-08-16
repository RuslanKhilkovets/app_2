import React from 'react';
import {AppIcon} from '@/components';
import {useGoBack} from '@/hooks';
import {TouchableOpacity} from 'react-native';

export default function GoBack() {
  const goBack = useGoBack();

  return (
    <TouchableOpacity onPress={goBack}>
      <AppIcon name="back" size={28} />
    </TouchableOpacity>
  );
}
