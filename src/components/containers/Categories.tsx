import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {CategoriesHeader, CategoriesList} from '@/components';
import {ICategory, ILocation} from '@/types';
import {defaultLocation} from '@/constants/globals';

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<ICategory | null>(null);
  const [location, setLocation] = useState<ILocation>({name: defaultLocation});
  const {navigate} = useNavigation();

  useEffect(() => {
    category !== null && navigate('Tabs');
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
