import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {IMessage} from '@/types';
import {AppIcon} from '@/components';
import {useNavigation} from '@react-navigation/native';

interface IPostItemProps {
  item: IMessage;
}

const MessageItem = ({item}: IPostItemProps) => {
  const navigation = useNavigation();

  const onNavigateToChat = () => {
    navigation.navigate('Chat', {chatId: item.id});
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onNavigateToChat}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
            <View style={[styles.imgContainer]}>
              <Image source={{uri: item.img}} style={styles.img} />
            </View>

            <View style={{gap: 6}}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>

            <AppIcon name="arrow" size={12} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F6F6',
    borderRadius: 10,
  },
  imgContainer: {
    alignItems: 'center',
    borderRadius: 5,
    width: 50,
    height: 50,
    backgroundColor: '#757575',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontFamily: 'Raleway-Medium',
    fontSize: 15,
    color: '#000',
    width: 220,
  },
  name: {
    fontFamily: 'Raleway-Medium',
    fontSize: 13,
    color: '#757575',
  },
  message: {
    fontFamily: 'Raleway-Medium',
    fontSize: 13,
    color: '#757575',
  },
});
