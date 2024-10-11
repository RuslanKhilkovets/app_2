import {StyleSheet, Text, View, Animated, Easing, Platform} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useTheme} from '@/contexts/Theme/ThemeContext';

interface ILogoProps {
  animated?: boolean;
}

const Logo = ({animated}: ILogoProps) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const {themes, colorScheme} = useTheme();

  useEffect(() => {
    if (animated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [animated]);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <Text
        style={[
          styles.text,
          {
            color:
              colorScheme === 'light'
                ? themes[colorScheme].dark
                : themes[colorScheme].light,
          },
        ]}>
        єЗнахідка!
      </Text>
      <View style={styles.circle}></View>
    </Animated.View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    height: 173,
    width: 173,
    borderRadius: 86.5,
    borderWidth: 4,
    borderColor: '#ff879d',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 27,
    fontFamily: 'Raleway-SemiBold',
  },
  circle: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: '#FF879D',
    position: 'absolute',
    bottom: -5,
    right: -10,
  },
});
