import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useRef} from 'react';

import TABS from '@/constants/Tabs';

interface ITabSwitchProps extends React.PropsWithChildren {
  activeTab: TABS;
  setActiveTab: (tab: TABS) => void;
  header?: React.ReactNode;
  headerStyle?: ViewStyle;
}

const TabsSwitch = ({
  activeTab,
  setActiveTab,
  children,
  header,
  headerStyle,
}: ITabSwitchProps) => {
  const underlinePosition = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  console.log(activeTab);

  useEffect(() => {
    Animated.timing(underlinePosition, {
      toValue: activeTab === TABS.I_LOOKING_FOR ? 0 : 1,
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

    StatusBar.setBackgroundColor(
      activeTab === TABS.I_LOOKING_FOR ? '#FFEAEA' : '#EDE7FF',
    );
  }, [activeTab]);

  const underlineLeft = underlinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  const underlineColor = underlinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FF4A4A', '#9847FF'],
  });

  const backgroundColor = underlinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFEAEA', '#EDE7FF'],
  });

  return (
    <>
      <StatusBar
        animated
        backgroundColor={
          activeTab === TABS.I_LOOKING_FOR ? '#FFEAEA' : '#EDE7FF'
        }
      />

      <Animated.View style={[{backgroundColor}, {padding: 16}, headerStyle]}>
        {header}
      </Animated.View>

      <Animated.View style={[styles.tabsSwitchersContainer, {backgroundColor}]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.tabsSwitcher}
          onPress={() => setActiveTab(TABS.I_LOOKING_FOR)}>
          <Text
            style={[
              styles.tabsSwitcherText,
              {
                fontFamily:
                  activeTab === TABS.I_LOOKING_FOR
                    ? 'Raleway-SemiBold'
                    : 'Raleway-Regular',
              },
            ]}>
            Я шукаю
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.tabsSwitcher}
          onPress={() => setActiveTab(TABS.I_FIND)}>
          <Text
            style={[
              styles.tabsSwitcherText,
              {
                fontFamily:
                  activeTab === TABS.I_FIND
                    ? 'Raleway-SemiBold'
                    : 'Raleway-Regular',
              },
            ]}>
            Я знайшов
          </Text>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.tabSwitcherLine,
            {
              left: underlineLeft,
              backgroundColor: underlineColor,
            },
          ]}
        />
      </Animated.View>

      <Animated.ScrollView style={{opacity: contentOpacity, height: '100%'}}>
        {children}
      </Animated.ScrollView>
    </>
  );
};

export default TabsSwitch;

const styles = StyleSheet.create({
  tabsSwitchersContainer: {
    position: 'relative',
    flexDirection: 'row',
  },
  tabsSwitcher: {
    padding: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  tabsSwitcherText: {
    fontSize: 15,
  },
  tabSwitcherLine: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 3,
  },
});
