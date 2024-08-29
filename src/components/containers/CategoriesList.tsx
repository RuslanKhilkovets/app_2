import {FlatList, StyleSheet} from 'react-native';
import React from 'react';

import {categories} from '@/constants';
import {CategoriesItem} from '@/components';

const CategoriesList = () => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={categories}
      renderItem={({item}) => (
        <CategoriesItem
          img={item.image}
          text={item.text}
          borderColor={item.borderColor}
        />
      )}
      keyExtractor={({id}) => id.toString()}
    />
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 15,
    columnGap: 20,
  },
});
