import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ITEM_STATUS} from '@/constants';

interface ItemStatusProps {
  status: ITEM_STATUS;
}

const ItemStatus = ({status}: ItemStatusProps) => {
  const statusText = status === ITEM_STATUS.INACTIVE ? 'Знайдено' : 'В пошуку';

  return (
    <Text
      style={[
        styles.status,
        status === ITEM_STATUS.INACTIVE ? styles.inactive : styles.active,
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
