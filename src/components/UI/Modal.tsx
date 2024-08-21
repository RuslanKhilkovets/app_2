import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal as NativeModal,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {AppIcon} from '@/components';

interface IModalProps extends React.PropsWithChildren {
  visible: boolean;
  onClose: () => void;
  title?: string;
  openFrom?: 'left' | 'right' | 'top' | 'bottom';
  headerBgColor?: string;
}

const Modal = ({
  visible,
  onClose,
  title,
  openFrom = 'right',
  children,
  headerBgColor = '#fff',
}: IModalProps) => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const [isVisible, setIsVisible] = useState(visible);

  const initialTranslate = {
    left: -screenWidth,
    right: screenWidth,
    top: -screenHeight,
    bottom: screenHeight,
  }[openFrom];

  const slideAnim = useRef(new Animated.Value(initialTranslate)).current;

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: initialTranslate,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
        onClose();
      });
    }
  }, [visible, initialTranslate]);

  const transformStyle = {
    transform: [
      openFrom === 'left' || openFrom === 'right'
        ? {translateX: slideAnim}
        : {translateY: slideAnim},
    ],
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: headerBgColor}}>
      <NativeModal
        animationType="none"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContainer, transformStyle]}>
            <View
              style={[styles.modalHeader, {backgroundColor: headerBgColor}]}>
              <View></View>

              <Text style={styles.modalTitle}>{title}</Text>

              <TouchableOpacity onPress={onClose}>
                <AppIcon name="delete_filter" />
              </TouchableOpacity>
            </View>
            {children}
          </Animated.View>
        </View>
      </NativeModal>
    </SafeAreaView>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Raleway-Semibold',
  },
});
