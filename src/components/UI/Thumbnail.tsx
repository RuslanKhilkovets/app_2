import {Image, StyleSheet, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {ImageModal} from '@/components';

interface IThumbnailProps {
  style: ViewStyle;
  uri: string;
  active?: boolean;
  setActiveImage: (uri: string) => void;
  onDelete: (uri: string) => void;
}

const Thumbnail = ({
  style,
  uri,
  active,
  setActiveImage,
  onDelete,
}: IThumbnailProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
        style={style}>
        <Image style={[styles.img, active && styles.active]} source={{uri}} />
      </TouchableOpacity>

      <ImageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        makeMain={() => setActiveImage(uri)}
        rotate={() => {}}
        onDelete={onDelete}
        uri={uri}
        active={!!active}
      />
    </>
  );
};

export default Thumbnail;

const styles = StyleSheet.create({
  img: {
    backgroundColor: '#888',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    height: '100%',
    width: '100%',
  },
  active: {
    borderColor: '#000',
  },
});
