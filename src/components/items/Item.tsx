import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {AppIcon} from '@/components';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@/contexts/Theme/ThemeContext';
import {IItem} from '@/types';
import {DateFormatter} from '@/helpers';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';

interface IItemProps {
  item: IItem;
}

const Item = ({item}: IItemProps) => {
  const [isFavorite, setIsFavorite] = useState(item?.is_favorite);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const {themes, colorScheme} = useTheme();

  const handleAddToFavourites = () => {
    favoriteMutate(item.id);
  };

  const {isLoading: isFavoriteLoading, mutate: favoriteMutate} =
    useAuthMutation({
      mutationFn: Api.favorites.togglePost,
      onSuccess: res => {
        setIsFavorite(res.data.result);
      },
      onError: ({errors}) => {
        setError(errors?.message);
      },
    });

  return (
    <TouchableOpacity
      style={[styles.container, {borderColor: themes[colorScheme].bgTertiary}]}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Item', {id: item.id})}>
      {item.photos.length !== 0 ? (
        <Image
          source={{
            uri:
              item.photos.find(item => item.is_main)?.url ||
              item?.photos[0]?.url,
          }}
          style={styles.image}
        />
      ) : (
        <View
          style={[
            styles.image,
            {backgroundColor: themes[colorScheme].bgTertiary},
          ]}>
          <Text style={styles.noPhotoText}>немає фото</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text
            style={[styles.contentTitle, {color: themes[colorScheme].dark}]}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {item.name}
          </Text>

          <TouchableOpacity activeOpacity={0.7} onPress={handleAddToFavourites}>
            <AppIcon
              name={isFavorite ? 'liked_card' : 'favorite_menu'}
              size={15}
              color={isFavorite ? 'red' : '#000'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contentFooter}>
          <Text
            style={[
              styles.contentFooterText,
              {color: themes[colorScheme].textSecondary},
            ]}>
            {item.location.name}
          </Text>

          <Text
            style={[
              styles.contentFooterText,
              {color: themes[colorScheme].textSecondary},
            ]}>
            {DateFormatter.formatLocalizedDate(new Date(item.published_at))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  image: {
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPhotoText: {
    color: '#757575',
    fontSize: 20,
    fontFamily: 'Raleway-Medium',
  },
  contentTitle: {
    fontSize: 15,
    width: 100,
    fontFamily: 'Raleway-Medium',
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  contentFooter: {
    width: '100%',
    marginTop: 20,
    gap: 5,
  },
  contentFooterText: {
    fontFamily: 'Raleway-Regular',
  },
});
