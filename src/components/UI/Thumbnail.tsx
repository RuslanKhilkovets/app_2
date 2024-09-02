import {Image, StyleSheet} from 'react-native';
import React from 'react';

interface IThumbnailProps {
  uri: string;
  active?: boolean;
}

const Thumbnail = ({uri, active}: IThumbnailProps) => {
  return <Image style={[styles.img, active && styles.active]} source={{uri}} />;
};

export default Thumbnail;

const styles = StyleSheet.create({
  img: {
    height: 70,
    width: 70,
    backgroundColor: '#888',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  active: {
    borderColor: '#000',
  },
});
