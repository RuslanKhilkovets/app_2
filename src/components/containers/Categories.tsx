import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {CategoriesHeader, CategoriesList} from '@/components';
import {ICategory, ILocation} from '@/types';

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<ICategory | null>(null);
  const [location, setLocation] = useState<ILocation | null>(null);
  const {navigate} = useNavigation();

  useEffect(() => {
    if (category !== null) {
      navigate('Tabs', {
        screen: 'search-tab',
        params: {
          location,
          category,
        },
      });
    }
  }, [category]);

  return (
    <>
      <CategoriesHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={location}
        setLocation={setLocation}
      />
      <CategoriesList setCategory={setCategory} searchQuery={searchQuery} />
    </>
  );
};

export default Categories;
