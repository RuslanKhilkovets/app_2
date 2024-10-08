import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';

import TABS from '@/constants/Tabs';
import {useTheme} from '@/contexts/Theme/ThemeContext';
import {useTabAnimation} from '@/hooks';

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
  const {underlinePosition, contentOpacity} = useTabAnimation(activeTab);

  const {themes, colorScheme} = useTheme();

  const backgroundColor = underlinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [
      themes[colorScheme].pinkLight,
      themes[colorScheme].purpleLight,
    ],
  });

  const underlineColor = underlinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [themes[colorScheme].primary, themes[colorScheme].purple],
  });
  const underlineLeft = underlinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  return (
    <>
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
                color: themes[colorScheme].dark,
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
                color: themes[colorScheme].dark,
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
