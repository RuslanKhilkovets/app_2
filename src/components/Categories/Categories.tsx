import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import {categories} from '@/constants';
import {CategoriesItem, CategoriesHeader, CategoriesList} from '@/components';

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <CategoriesHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <CategoriesList />
    </>
  );
};

export default Categories;
