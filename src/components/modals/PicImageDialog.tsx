import React, {useEffect, useRef} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import PicIcon from '@icons/pic.svg';
import CameraIcon from '@icons/camera.svg';
import {IAddItemFormData, IModalProps} from '@/types';
import {Button} from '@/components';

interface IPicImageDialogProps extends IModalProps {
  setUris: React.Dispatch<React.SetStateAction<IAddItemFormData>>;
}

const PicImageDialog = ({visible, onClose, setUris}: IPicImageDialogProps) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const animateModal = (toValue: number, onComplete?: () => void) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: toValue === 0 ? 1 : 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(onComplete);
  };

  useEffect(() => {
    visible ? animateModal(0) : animateModal(300, onClose);
  }, [visible]);

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log('Image selected: ', response?.assets);
        setUris(prev => {
          const newImgUris = [...prev.imgUris];
          response?.assets?.[0].uri &&
            newImgUris.push({
              uri: response?.assets[0].uri,
              active: prev.imgUris.length === 0,
            });

          return {
            ...prev,
            imgUris: newImgUris,
          };
        });

        onClose();
      }
    });
  };

  const takePhoto = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        setUris(prev => {
          return {
            ...prev,
            imgUris: [
              ...prev.imgUris,
              {uri: response?.assets[0].uri, active: prev.imgUris.length === 0},
            ],
          };
        });

        onClose();
      }
    });
  };

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <Animated.View style={[styles.overlay, {opacity: opacityAnim}]}>
        <Animated.View
          style={[styles.content, {transform: [{translateY: slideAnim}]}]}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={takePhoto}>
            <CameraIcon />
            <Text style={styles.text}>Зробити фото</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={selectImage}>
            <PicIcon />
            <Text style={styles.text}>Вибрати фото</Text>
          </TouchableOpacity>
          <Button onPress={() => animateModal(300, onClose)} type="secondary">
            Закрити
          </Button>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default PicImageDialog;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'flex-end',
  },
  content: {
    width: '100%',
    padding: 20,
    paddingTop: 30,
    gap: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  btn: {
    flexDirection: 'row',
    gap: 20,
  },
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
  },
});
