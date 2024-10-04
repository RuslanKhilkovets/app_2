import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, RefreshControl} from 'react-native';

import {PostItem, Screen} from '@/components';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';
import {IPostItem} from '@/types';

const ActivePublicationsScreen = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>();
  const [posts, setPosts] = useState<IPostItem[]>([]);
  const [error, setError] = useState<string | null>(null);

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
      setError(errors?.message);
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
      <Pressable style={{flex: 1}} onPress={handleMenuClose}>
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
          contentContainerStyle={{gap: 15}}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        />
      </Pressable>
    </Screen>
  );
};

export default ActivePublicationsScreen;
