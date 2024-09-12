import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  AppIcon,
  GoBack,
  Input,
  ItemStatus,
  KeyboardScroll,
  Thumbnail,
} from '@/components';
import {ITEM_STATUS} from '@/constants';
import SendIcon from '@icons/send.svg';
import {IPicture} from '@/types';
import {selectImage} from '@/helpers';

const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState('');
  const [imgUris, setImgUris] = useState<IPicture[]>([]);

  const insets = useSafeAreaInsets();

  const handleSelectImage = async () => {
    try {
      const photoUri = await selectImage();

      if (photoUri) {
        setImgUris(prev => [
          ...prev,
          {
            uri: photoUri,
            active: false,
          },
        ]);
      }
    } catch (error) {
      console.log('Error taking photo:', error);
    }
  };

  const onDeleteImage = (uri: string) => {
    setImgUris(prev => prev.filter(item => item.uri !== uri));
  };

  const onChange = (text: string) => {
    setNewMessage(text);
  };

  const sentMessage = () => {
    setImgUris([]);
    setNewMessage('');
  };

  return (
    <View style={{paddingTop: insets.top, backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
        <View style={{position: 'absolute', left: 15}}>
          <GoBack />
        </View>
        <View style={styles.imgHeaderContainer}>
          <Image style={styles.img} />
        </View>

        <Text style={styles.name}>Тарас</Text>
      </View>

      <View style={styles.object}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <View style={styles.imgContainer}>
            <Image style={styles.img} />
          </View>
          <Text style={styles.title}>Iphone 12</Text>
        </View>

        <ItemStatus status={ITEM_STATUS.ACTIVE} />
      </View>
      <KeyboardScroll>
        <View style={{flex: 1, backgroundColor: '#f5f5f5'}}></View>

        <View
          style={[styles.messageInputContainer, {marginBottom: insets.bottom}]}>
          {imgUris.length !== 0 && (
            <FlatList
              scrollEnabled={false}
              data={imgUris}
              renderItem={({item}) => (
                <View style={{width: '25%', paddingHorizontal: 10}}>
                  <Thumbnail
                    uri={item.uri}
                    active={item.active}
                    setActiveImage={() => {}}
                    onDelete={onDeleteImage}
                    style={{width: '100%', aspectRatio: 1}}
                    readonly
                  />
                </View>
              )}
              keyExtractor={item => item.uri}
              numColumns={4}
              columnWrapperStyle={{}}
              contentContainerStyle={{
                marginBottom: 20,
                rowGap: 20,
              }}
              style={{marginLeft: -10, marginRight: -10, overflow: 'visible'}}
            />
          )}

          <Input
            value={newMessage}
            onChangeText={onChange}
            endAdornment={
              <View style={{flexDirection: 'row', gap: 20}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleSelectImage}>
                  <AppIcon name="file" />
                </TouchableOpacity>

                {(newMessage || imgUris.length !== 0) && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={sentMessage}
                    style={{
                      borderRadius: 13,
                      height: 26,
                      width: 26,
                      backgroundColor: '#000',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SendIcon />
                  </TouchableOpacity>
                )}
              </View>
            }
            placeholder="Повідомлення"
          />
        </View>
      </KeyboardScroll>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  messageInputContainer: {
    padding: 20,
  },
  imgHeaderContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  imgContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  name: {
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
  },
  object: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E7E3E3',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
  },
});
