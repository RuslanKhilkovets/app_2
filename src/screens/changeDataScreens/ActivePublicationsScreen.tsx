import React, {useEffect, useState} from 'react';
import {FlatList, Pressable} from 'react-native';

import {PostItem, Screen} from '@/components';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';

const ActivePublicationsScreen = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState([]);

  const handleMenuToggle = (id: number | null) => {
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

  useEffect(() => {
    mutate();
  }, []);

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
            />
          )}
          style={{overflow: 'visible', marginTop: 25}}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{gap: 15, overflow: 'visible'}}
        />
      </Pressable>
    </Screen>
  );
};

export default ActivePublicationsScreen;
