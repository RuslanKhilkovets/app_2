import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

import {FilterItem, Modal, EditButton, Button} from '@/components';
import {IModalProps} from '@/types';

enum TABS {
  TAB_ONE = 1,
  TAB_TWO = 2,
}

const FilterModal = ({visible, onClose}: IModalProps) => {
  const [activeTab, setActiveTab] = useState(TABS.TAB_ONE);
  const underlinePosition = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(underlinePosition, {
      toValue: activeTab === TABS.TAB_ONE ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.sequence([
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeTab]);

  const underlineLeft = underlinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  const underlineColor = underlinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FF4A4A', '#9847FF'],
  });

  const tabContent = {
    [TABS.TAB_ONE]: (
      <View style={styles.tabContent}>
        <FilterItem title="Категорія">
          <EditButton title="Вибрати категорію" onPress={() => {}} />
        </FilterItem>
        <FilterItem title="Дата публікації">
          <View style={{flexDirection: 'row', gap: 10}}>
            <TouchableOpacity activeOpacity={0.7} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>За останній тиждень</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>Останній місяць</Text>
            </TouchableOpacity>
          </View>
        </FilterItem>
        <FilterItem title="Локація">
          <EditButton title="Луцьк" onPress={() => {}} />
        </FilterItem>
        <Button onPress={() => {}} style={{marginTop: 30}}>
          Застосувати
        </Button>
      </View>
    ),
    [TABS.TAB_TWO]: (
      <View style={styles.tabContent}>
        <Text>Tab Two Content</Text>
      </View>
    ),
  };

  return (
    <Modal visible={visible} onClose={onClose} title="Фільтр">
      <View style={styles.container}>
        <View style={styles.tabsSwitchersContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.tabsSwitcher}
            onPress={() => setActiveTab(TABS.TAB_ONE)}>
            <Text
              style={[
                styles.tabsSwitcherText,
                {
                  fontFamily:
                    activeTab === TABS.TAB_ONE
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
            onPress={() => setActiveTab(TABS.TAB_TWO)}>
            <Text
              style={[
                styles.tabsSwitcherText,
                {
                  fontFamily:
                    activeTab === TABS.TAB_TWO
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
        </View>

        <Animated.View style={{opacity: contentOpacity, flex: 1}}>
          {tabContent[activeTab]}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsSwitchersContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    position: 'relative',
  },
  tabsSwitcher: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsSwitcherText: {
    fontSize: 15,
  },
  tabSwitcherLine: {
    position: 'absolute',
    bottom: -10,
    width: '50%',
    height: 3,
  },
  tabContent: {
    padding: 16,
    backgroundColor: '#fff',
  },
  dateButton: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e4e4e4',
    flexShrink: 1,
  },
  dateButtonText: {
    fontFamily: 'Raleway-Regular',
    color: '#595959',
  },
});
