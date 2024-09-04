import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal as NativeModal,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {AppIcon} from '@/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@/contexts/Theme/ThemeContext';

interface IModalProps extends React.PropsWithChildren {
  visible: boolean;
  onClose: () => void;
  title?: string;
  openFrom?: 'left' | 'right' | 'top' | 'bottom';
  headerBgColor?: string | Animated.AnimatedInterpolation<string | number>;
}

const Modal = ({
  visible,
  onClose,
  title,
  openFrom = 'right',
  children,
  headerBgColor,
}: IModalProps) => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const [isVisible, setIsVisible] = useState(visible);

  const insets = useSafeAreaInsets();
  const {themes, colorScheme} = useTheme();

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
  }, [visible]);

  const transformStyle = {
    transform: [
      openFrom === 'left' || openFrom === 'right'
        ? {translateX: slideAnim}
        : {translateY: slideAnim},
    ],
  };

  return (
    <NativeModal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContainer, transformStyle]}>
          <Animated.View
            style={[
              styles.modalHeader,
              {
                backgroundColor: headerBgColor,
                paddingTop:
                  Platform.OS === 'android' ? insets.top + 30 : insets.top,
              },
            ]}>
            <Text
              style={[styles.modalTitle, {color: themes[colorScheme].dark}]}>
              {title}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.closeIcon,
                {top: Platform.OS === 'ios' ? 50 : 35},
              ]}>
              <AppIcon name="delete_filter" />
            </TouchableOpacity>
          </Animated.View>
          {children}
        </Animated.View>
      </View>
    </NativeModal>
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
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  modalTitle: {
    width: '100%',
    fontSize: 22,
    fontFamily: 'Raleway-Semibold',
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    right: 20,
  },
});
