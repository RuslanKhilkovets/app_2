import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';

import {ICategory, IImage} from '@/types';

interface ICategoriesItemProps {
  id: string;
  name: string;
  image?: IImage | null;
  style?: ImageStyle;
  setCategory: Dispatch<SetStateAction<ICategory | null>>;
}

const CategoriesItem = ({
  id,
  name,
  image,
  style,
  setCategory,
}: ICategoriesItemProps) => {
  const onCategoryChange = () => {
    setCategory && setCategory({id, name});
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onCategoryChange}>
      <View style={styles.image}>
        {image?.url ? (
          <Image source={{uri: image.url}} style={[style, styles.image]} />
        ) : (
          <View style={[styles.noImg, styles.image]}>
            <Text style={styles.noPhotoText}>Немає фото</Text>
          </View>
        )}
      </View>

      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoriesItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    color: '#000',
    fontFamily: 'Raleway-Medium',
    width: 110,
    textAlign: 'center',
  },
  image: {
    aspectRatio: 1,
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  noImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#757575',
    borderRadius: 40,
  },
  noPhotoText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Raleway-Medium',
  },
});
