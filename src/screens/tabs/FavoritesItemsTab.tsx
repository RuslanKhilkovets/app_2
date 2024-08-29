import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TABS from '@/constants/Tabs';
import {FavoriteBlock, Item, SearchItem} from '@/components';

const FavoritesItemsTab = () => {
  const [activeTab, setActiveTab] = useState(TABS.I_FIND);

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

  const pubs = [
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
    {
      id: 4,
      title: 'Iphone 12',
      city: 'Луцьк',
      date: '9 серпня',
    },
  ];

  const getContent = () => {
    switch (activeTab) {
      case TABS.I_FIND: {
        return (
          <View style={styles.blocks}>
            <FavoriteBlock title="Пошуки">
              <FlatList
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <SearchItem data={item} />}
              />
            </FavoriteBlock>

            <FavoriteBlock title="Публікації">
              <FlatList
                data={pubs}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <Item date={item.date} city={item.city} title={item.title} />
                )}
              />
            </FavoriteBlock>
          </View>
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Вибране</Text>
      </View>
      <ScrollView style={styles.content}>{getContent()}</ScrollView>
    </View>
  );
};

export default FavoritesItemsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {},
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
