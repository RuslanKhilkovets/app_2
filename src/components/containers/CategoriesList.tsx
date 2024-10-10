import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {Dispatch, SetStateAction} from 'react';

import {CategoriesItem} from '@/components';
import {Api} from '@/api';
import {useAuthMutation} from '@/hooks';
import {ICategory} from '@/types';
import {showMessage} from '@/helpers';

interface ICategoriesListProps {
  setCategory:
    | Dispatch<SetStateAction<ICategory | null>>
    | ((category: ICategory) => void);
  searchQuery?: string;
}

const CategoriesList = ({setCategory, searchQuery}: ICategoriesListProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const {isLoading, mutate} = useAuthMutation({
    mutationFn: Api.suggest.getCategories,
    onSuccess: res => {
      setCategories(res.data.data);
    },
    onError: ({errors}) => {
      showMessage('error', errors.message);
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  const filteredCategories = searchQuery
    ? categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : categories;

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          contentContainerStyle={styles.container}
          data={filteredCategories}
          renderItem={({item}) => (
            <CategoriesItem
              id={item.id}
              style={styles.item}
              image={item.image}
              name={item.name}
              setCategory={setCategory}
            />
          )}
          keyExtractor={({id}) => id.toString()}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
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
    gap: 20,
  },
});
