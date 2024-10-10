import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';

import {PostItem, Screen} from '@/components';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';
import {IPostItem} from '@/types';
import {showMessage} from '@/helpers';

const ActivePublicationsScreen = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>();
  const [posts, setPosts] = useState<IPostItem[]>([]);

  const handleMenuToggle = (id: string) => {
    setOpenMenuId(prevId => (prevId === id ? null : id));
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
  };

  const {isLoading, mutate} = useAuthMutation({
    mutationFn: Api.myPosts.getAll,
    onSuccess: res => {
      setPosts(res.data.data);
    },
    onError: ({errors}) => {
      showMessage('error', errors.message);
    },
  });

  const fetchPosts = () => {
    mutate();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = () => {
    fetchPosts();
  };

  return (
    <Screen title="Активні публікації" backColor="#fff">
      <Pressable
        style={{
          flex: 1,
          overflow: 'visible',
        }}
        onPress={handleMenuClose}>
        {posts?.length !== 0 ? (
          <FlatList
            data={posts}
            renderItem={({item}) => (
              <PostItem
                item={item}
                isOpen={openMenuId === item.id}
                onMenuToggle={() => handleMenuToggle(item.id)}
                resetMenu={handleMenuClose}
                setPosts={setPosts}
              />
            )}
            style={{overflow: 'visible', marginTop: 25}}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{
              gap: 15,
              overflow: 'visible',
              paddingBottom: 50,
              paddingTop: 10,
            }}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
          />
        ) : (
          <Text style={styles.emptyText}>
            Активних публікацій поки немає ;)
          </Text>
        )}
      </Pressable>
    </Screen>
  );
};

export default ActivePublicationsScreen;

const styles = StyleSheet.create({
  emptyText: {
    fontFamily: 'Raleway-Regular',
    color: '#666',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingTop: 250,
    paddingBottom: 10,
  },
});
