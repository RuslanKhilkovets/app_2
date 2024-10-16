import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ContentType from '@/constants/ContentType';
import {MessageItem, TabsSwitch} from '@/components';
import {IMessage} from '@/types';

const ChatsTab = () => {
  const [activeTab, setActiveTab] = useState(ContentType.I_LOOKING_FOR);

  const insets = useSafeAreaInsets();

  const messages: IMessage[] = [
    {
      id: 1,
      title: 'Iphone 12',
      name: 'Alina',
      img: '',
      lastMessage: 'Hello ',
    },
    {
      id: 2,
      title: 'Xiaomi Redmi Note 15T Pro+ Mega Super Ultra',
      name: 'Andrew',
      img: '',
      lastMessage: 'i lost my phone, if u do not return, i kill ur dog ',
    },
    {
      id: 3,
      title: 'LIL NIGGA',
      name: 'NIGGA',
      img: '',
      lastMessage: 'U found my nigga ',
    },
  ];

  return (
    <View style={styles.container}>
      <TabsSwitch
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        header={
          <Text style={[styles.title, {paddingTop: insets.top}]}>
            Повідомлення
          </Text>
        }>
        <ScrollView style={styles.content}>
          {activeTab === ContentType.I_LOOKING_FOR ? (
            <FlatList
              scrollEnabled={false}
              data={messages}
              renderItem={({item}) => <MessageItem item={item} />}
              keyExtractor={item => String(item.id)}
              contentContainerStyle={[]}
              style={[{backgroundColor: '#fff'}]}
            />
          ) : (
            <></>
          )}
        </ScrollView>
      </TabsSwitch>
    </View>
  );
};

export default ChatsTab;

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
