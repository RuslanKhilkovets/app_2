import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

import {AppIcon, Button, Modal} from '@/components';
import {IModalProps} from '@/types';

interface IImageModalProps extends IModalProps {
  id: string;
  uri: string;
  active: boolean;
  onDelete: (uri: string) => void;
  rotate: () => void;
  makeMain: () => void;
}

const ImageModal = ({
  visible,
  onClose,
  openFrom,
  onDelete,
  rotate,
  makeMain,
  uri,
  id,
  active,
}: IImageModalProps) => {
  console.log(active);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Фото публікації"
      headerBgColor={'#fff'}
      openFrom={openFrom}>
      <View style={{flex: 1, padding: 20, gap: 20, marginTop: 50}}>
        <Image source={{uri}} style={styles.img} />
        {!active && <Button onPress={makeMain}>Зробити головним</Button>}
        <View style={{flexDirection: 'row', gap: 20}}>
          <Button
            style={{flex: 1}}
            type="bordered"
            onPress={() => onDelete(id)}
            before={<AppIcon name="delete" />}>
            Видалити
          </Button>
          <Button
            style={{flex: 1}}
            type="bordered"
            onPress={onDelete}
            before={<AppIcon name="turn" />}>
            Повернути
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 328,
    borderRadius: 5,
  },
});
