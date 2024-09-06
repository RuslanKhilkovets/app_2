import {FlatList, StyleSheet, View, Button} from 'react-native';
import React, {useState} from 'react';

import {categories} from '@/constants';
import {CategoriesItem} from '@/components';

const CategoriesList = () => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        contentContainerStyle={styles.container}
        data={categories}
        renderItem={({item}) => (
          <CategoriesItem
            style={styles.item}
            img={item.image}
            text={item.text}
            borderColor={item.borderColor}
          />
        )}
        keyExtractor={({id}) => id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    rowGap: 20,
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
