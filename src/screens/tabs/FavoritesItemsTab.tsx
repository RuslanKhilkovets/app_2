import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ContentType from '@/constants/ContentType';
import {
  FavoriteBlock,
  ItemsContainer,
  SearchItem,
  TabsSwitch,
} from '@/components';
import {IItem} from '@/types';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';
import {showMessage} from '@/helpers';

const FavoritesItemsTab = () => {
  const [activeTab, setActiveTab] = useState(ContentType.I_LOOKING_FOR);
  const [wantedPosts, setWantedPosts] = useState<IItem[]>([]);
  const [wantedFilters, setWantedFilters] = useState<any[]>([]);
  const [foundedPosts, setFoundedPosts] = useState<IItem[]>([]);
  const [foundedFilters, setFoundedFilters] = useState<any[]>([]);

  const insets = useSafeAreaInsets();

  const {isLoading: isFiltersLoading, mutate: filtersMutate} = useAuthMutation({
    mutationFn: Api.favorites.getFilters,
    onSuccess: res => {
      activeTab === ContentType.I_LOOKING_FOR
        ? setWantedFilters(res.data.data)
        : setFoundedFilters(res.data.data);
    },
    onError: ({errors}) => {
      showMessage('error', errors?.message);
    },
  });
  const {isLoading: isPostsLoading, mutate: postsMutate} = useAuthMutation({
    mutationFn: Api.favorites.getAll,
    onSuccess: res => {
      activeTab === ContentType.I_LOOKING_FOR
        ? setWantedPosts(res.data.data)
        : setFoundedPosts(res.data.data);
    },
    onError: ({errors}) => {
      showMessage('error', errors?.message);
    },
  });

  useEffect(() => {
    postsMutate({type: activeTab});
    filtersMutate({type: activeTab});
  }, [activeTab]);
  console.log(wantedFilters);

  return (
    <View style={styles.container}>
      <TabsSwitch
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        header={
          <Text style={[styles.title, {paddingTop: insets.top}]}>Вибране</Text>
        }>
        <ScrollView style={styles.content}>
          {activeTab === ContentType.I_LOOKING_FOR ? (
            <>
              {wantedFilters?.length > 0 && (
                <FavoriteBlock title="Пошуки">
                  <FlatList
                    scrollEnabled={false}
                    data={wantedFilters}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <SearchItem data={item} />}
                  />
                </FavoriteBlock>
              )}

              {wantedPosts?.length > 0 && (
                <FavoriteBlock title="Публікації">
                  <ItemsContainer
                    items={wantedPosts}
                    style={{paddingTop: 20}}
                    containerStyle={{paddingBottom: insets.bottom}}
                  />
                </FavoriteBlock>
              )}
              {((wantedFilters?.length === 0 &&
                wantedPosts?.length === 0 &&
                isFiltersLoading) ||
                isPostsLoading) && (
                <FavoriteBlock title="Немає збережених фільтрів"></FavoriteBlock>
              )}
            </>
          ) : (
            <>
              {foundedFilters?.length > 0 && (
                <FavoriteBlock title="Пошуки">
                  <FlatList
                    scrollEnabled={false}
                    data={foundedFilters}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <SearchItem data={item} />}
                  />
                </FavoriteBlock>
              )}
              {foundedPosts?.length > 0 && (
                <FavoriteBlock title="Публікації">
                  <ItemsContainer
                    items={foundedPosts}
                    style={{paddingTop: 20}}
                    containerStyle={{paddingBottom: insets.bottom}}
                  />
                </FavoriteBlock>
              )}
              {((foundedFilters?.length === 0 &&
                foundedPosts?.length === 0 &&
                isFiltersLoading) ||
                isPostsLoading) && (
                <FavoriteBlock title="Немає збережених фільтрів"></FavoriteBlock>
              )}
            </>
          )}
        </ScrollView>
      </TabsSwitch>
    </View>
  );
};

export default FavoritesItemsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Raleway-SemiBold',
    color: '#000',
    fontSize: 22,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
  },
});
