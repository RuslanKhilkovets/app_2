import {FlatList, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';

import {IItem} from '@/types';
import {Item} from '@/components';

interface IItemsContainerProps {
  items: IItem[];
  style?: ViewStyle;
}

const ItemsContainer = ({items, style}: IItemsContainerProps) => {
  console.log(items);
  return (
    <FlatList
      data={items}
      renderItem={({item}) => (
        <Item
          title={item.title}
          city={item.city}
          date={item.date}
          image={item.image}
        />
      )}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={style}
    />
  );
};

export default ItemsContainer;

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 16,
  },
});
