import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import {categories} from '@/constants';
import {CategoriesItem, CategoriesHeader} from '@/components';

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <CategoriesHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

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
    </>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 15,
    columnGap: 20,
    marginTop: 30,
  },
});
