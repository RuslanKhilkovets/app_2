import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import Phone from '../../../assets/images/phones.png';

interface ICategoriesItemProps {
  text: string;
  img: string;
  borderColor: string;
}

const CategoriesItem = ({text, img, borderColor}: ICategoriesItemProps) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <Image
        source={Phone}
        style={[
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
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    color: '#000',
    fontFamily: 'Raleway-Medium',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
