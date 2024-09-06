import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {AppIcon, ImageModal} from '@/components';

interface IThumbnailProps {
  style: ViewStyle;
  uri: string;
  active?: boolean;
  setActiveImage: (uri: string) => void;
  onDelete: (uri: string) => void;
  readonly?: boolean;
}

const Thumbnail = ({
  style,
  uri,
  active,
  setActiveImage,
  onDelete,
  readonly = false,
}: IThumbnailProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
        style={style}>
        <Image style={[styles.img, active && styles.active]} source={{uri}} />

        {readonly && (
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => onDelete(uri)}>
            <AppIcon name="close" color="#fff" size={15} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <ImageModal
        visible={modalVisible && !readonly}
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
  deleteBtn: {
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: 12,
    width: 24,
    height: 24,
    backgroundColor: '#000',
    overflow: 'visible',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
