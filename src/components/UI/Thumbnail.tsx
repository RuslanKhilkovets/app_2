import {Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {ImageModal} from '@/components';

interface IThumbnailProps {
  uri: string;
  active?: boolean;
  setActiveImage: (uri: string) => void;
  onDelete: (uri: string) => void;
}

const Thumbnail = ({
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
        onPress={() => setModalVisible(true)}>
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
