import React, {useState} from 'react';
import {FlatList, Pressable, ScrollView} from 'react-native';

import {PostItem, Screen} from '@/components';

const ActivePublicationsScreen = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleMenuToggle = (id: number | null) => {
    setOpenMenuId(prevId => (prevId === id ? null : id));
  };
  const handleMenuClose = () => {
    setOpenMenuId(null);
  };

  const posts = [
    {
      id: 1,
      img: '',
      title: 'Iphone 12',
      status: 1,
      city: 'Луцьк',
      date: '9 серпня 2022',
    },
    {
      id: 2,
      img: '',
      title: 'Iphone 12',
      status: 0,
      city: 'Луцьк',
      date: '9 серпня 2022',
    },
  ];

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
