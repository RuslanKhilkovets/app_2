import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

import ContentType from '@/constants/ContentType';

const useTabAnimation = (activeTab: string) => {
  const underlinePosition = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(underlinePosition, {
      toValue: activeTab === ContentType.I_LOOKING_FOR ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.sequence([
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeTab, underlinePosition, contentOpacity]);

  return {
    underlinePosition,
    contentOpacity,
  };
};

export default useTabAnimation;
