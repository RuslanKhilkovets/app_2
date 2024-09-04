import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Phone from '../../../assets/images/item_example.png';

import {AppIcon} from '@/components';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@/contexts/Theme/ThemeContext';

interface IItemProps {
  id: number | string;
  title: string;
  date: any;
  city: string;
  image?: string;
  isSaved?: boolean;
}

const Item = ({id, title, date, city, image, isSaved}: IItemProps) => {
  const navigation = useNavigation();

  const {themes, colorScheme} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, {borderColor: themes[colorScheme].bgTertiary}]}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Item', {id})}>
      {image ? (
        <Image source={Phone} style={styles.image} />
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
            {title}
          </Text>

          <TouchableOpacity activeOpacity={0.7}>
            <AppIcon name="favorite_menu" size={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentFooter}>
          <Text
            style={[
              styles.contentFooterText,
              {color: themes[colorScheme].textSecondary},
            ]}>
            {city}
          </Text>

          <Text
            style={[
              styles.contentFooterText,
              {color: themes[colorScheme].textSecondary},
            ]}>
            {date}
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
