import {FlatList, ScrollView, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';

import {IItem} from '@/types';
import {Item} from '@/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  return (
    <ScrollView style={[containerStyle, {backgroundColor: '#fff'}]}>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <Item
            item={item}
          />
        )}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={[style]}
      />
    </ScrollView>
  );
};

export default ItemsContainer;

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 16,
  },
});
