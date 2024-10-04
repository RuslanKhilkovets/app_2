import {FlatList, StyleSheet, Text, ViewStyle} from 'react-native';
import React from 'react';

import {IItem} from '@/types';
import {Item} from '@/components';

interface IItemsContainerProps {
  items: IItem[];
  style?: ViewStyle;
  containerStyle?: ViewStyle;
}

const ItemsContainer = ({
  items,
  style,
  containerStyle,
}: IItemsContainerProps) => {
  return items?.length !== 0 ? (
    <FlatList
      scrollEnabled={false}
      data={items}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={[style]}
      style={[containerStyle, {backgroundColor: '#fff', minHeight: 550}]}
    />
  ) : (
    <Text style={styles.noDataText}>Дані відсутні</Text>
  );
};

export default ItemsContainer;

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 16,
  },
  noData: {
    minHeight: 560,
  },
  noDataText: {
    marginTop: 50,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Raleway-Medium',
    fontSize: 24,
    color: '#999',
  },
});
