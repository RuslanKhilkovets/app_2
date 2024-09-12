import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import TABS from '@/constants/Tabs';
import {
  FavoriteBlock,
  ItemsContainer,
  SearchItem,
  TabsSwitch,
} from '@/components';
import {IItem} from '@/types';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';

const FavoritesItemsTab = () => {
  const [activeTab, setActiveTab] = useState(TABS.I_LOOKING_FOR);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const insets = useSafeAreaInsets();

  const {isLoading: isPostsLoading, mutate: postsMutate} = useAuthMutation({
    mutationFn: Api.favorites.getAll,
    onSuccess: res => {
      setPosts(res.data);
      console.log(res);
    },
    onError: ({errors}) => {
      setError(errors?.message);
    },
  });

  useEffect(() => {
    postsMutate({type: activeTab});
  }, []);

  return (
    <View style={styles.container}>
      <TabsSwitch
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        header={
          <Text style={[styles.title, {paddingTop: insets.top}]}>Вибране</Text>
        }>
        <ScrollView style={styles.content}>
          {activeTab === TABS.I_LOOKING_FOR ? (
            <>
              {/* <FavoriteBlock title="Пошуки">
              <FlatList
                scrollEnabled={false}
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <SearchItem data={item} />}
              />
            </FavoriteBlock>

            <FavoriteBlock title="Публікації">
              <ItemsContainer
                items={pubs}
                style={{paddingTop: 20}}
                containerStyle={{paddingBottom: insets.bottom}}
              />
            </FavoriteBlock> */}
            </>
          ) : (
            <></>
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
