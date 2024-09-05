import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import TABS from '@/constants/Tabs';
import {
  FavoriteBlock,
  ItemsContainer,
  SearchItem,
  TabsSwitch,
} from '@/components';
import {IItem} from '@/types';

const FavoritesItemsTab = () => {
  const [activeTab, setActiveTab] = useState(TABS.I_LOOKING_FOR);

  const insets = useSafeAreaInsets();

  const items = [
    {
      id: 1,
      name: 'Iphone 12',
      category: 'phones',
      dateFrom: '1 серпня',
      dateTo: '12 серпня',
      location: 'м.Київ',
      photo: true,
      results: 1,
    },
    {
      id: 2,
      name: 'Iphone 12',
      category: 'keys',
      dateFrom: '1 серпня',
      dateTo: '12 серпня',
      location: 'м.Луцьк',
      photo: false,
      results: 0,
    },
  ];

  const pubs: IItem[] = [
    {
      id: 1,
      title: 'Iphone 12',
      city: 'Луцьк',
      date: '9 серпня',
    },
    {
      id: 2,
      title: 'Iphone 12',
      city: 'Луцьк',
      date: '9 серпня',
    },
    {
      id: 3,
      title: 'Iphone 12',
      city: 'Луцьк',
      date: '9 серпня',
    },
  ];

  const getContent = () => {
    switch (activeTab) {
      case TABS.I_LOOKING_FOR: {
        return (
          <>
            <FavoriteBlock title="Пошуки">
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
            </FavoriteBlock>
          </>
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <TabsSwitch
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        header={
          <Text style={[styles.title, {paddingTop: insets.top}]}>Вибране</Text>
        }>
        <ScrollView style={styles.content}>{getContent()}</ScrollView>
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
