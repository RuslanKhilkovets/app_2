import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';

import Phone from '../../../assets/images/phones.png';

interface ICategoriesItemProps {
  text: string;
  img: string;
  borderColor: string;
  style?: ViewStyle;
}

const CategoriesItem = ({
  text,
  img,
  borderColor,
  style,
}: ICategoriesItemProps) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <Image
        source={Phone}
        style={[
          style,
          styles.image,
          {
            borderWidth: 1,

            borderColor,
          },
        ]}
      />

      <Text style={styles.text}>{text}</Text>
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
  },
  image: {
    aspectRatio: 1,
    borderRadius: 50,
  },
});
