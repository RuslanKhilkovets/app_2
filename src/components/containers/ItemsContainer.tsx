import {
  FlatList,
  StyleSheet,
  Text,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React from 'react';

import {IItem} from '@/types';
import {Item} from '@/components';

interface IItemsContainerProps {
  items: IItem[];
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isScrollListen?: boolean;
}

const ItemsContainer = ({
  items,
  style,
  containerStyle,
  onScroll,
  isScrollListen = false,
}: IItemsContainerProps) => {
  return items?.length !== 0 ? (
    <FlatList
      scrollEnabled={true}
      data={items}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={[
        style,
        {paddingBottom: isScrollListen ? 300 : 150},
      ]}
      style={[containerStyle, {backgroundColor: '#fff', minHeight: 580}]}
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  ) : (
    <Text style={styles.noDataText}>Дані відсутні</Text>
  );
};

export default ItemsContainer;

const styles = StyleSheet.create({
  columnWrapper: {
    flex: 1,
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
