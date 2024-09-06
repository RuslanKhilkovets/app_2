import React, {useState} from 'react';

import {CategoriesHeader, CategoriesList} from '@/components';

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
