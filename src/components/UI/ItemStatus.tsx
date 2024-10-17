import {StyleSheet, Text} from 'react-native';
import React from 'react';

import TABS from '@/constants/Tabs';

interface ItemStatusProps {
  status: TABS;
}

const ItemStatus = ({status}: ItemStatusProps) => {
  const statusText = status === TABS.I_LOOKING_FOR ? 'В пошуку' : 'Знайшов';

  return (
    <Text
      style={[
        styles.status,
        status !== TABS.I_LOOKING_FOR ? styles.inactive : styles.active,
      ]}>
      {statusText}
    </Text>
  );
};

export default ItemStatus;

const styles = StyleSheet.create({
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Raleway-Medium',
    fontSize: 13,
  },
  active: {
    borderColor: '#ff4a4a',
    color: '#ff4a4a',
  },
  inactive: {
    borderColor: '#9847FF',
    color: '#9847FF',
  },
});
