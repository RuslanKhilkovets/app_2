import {Animated, StyleSheet, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

import {
  Modal,
  CategoriesList,
  SelectLocationList,
  TabsSwitch,
  ItemForm,
} from '@/components';
import {IModalProps} from '@/types';
import TABS from '@/constants/Tabs';

enum FILTER_TYPE {
  WITH_DESCRIPTION = 1,
  WITH_PIC = 2,
}

enum STATIC_DATE_TYPE {
  WEEK = 1,
  MONTH = 2,
}

const AddItemModal = ({visible, onClose, openFrom}: IModalProps) => {
  const [activeTab, setActiveTab] = useState(TABS.I_LOOKING_FOR);
  const [selectedValues, setSelectedValues] = useState<FILTER_TYPE[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  const underlinePosition = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  const backgroundColor = underlinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFEAEA', '#EDE7FF'],
  });

  const tabContent = {
    [TABS.I_LOOKING_FOR]: <ItemForm type="i_looking_for" />,
    [TABS.I_FIND]: <ItemForm type="i_find" />,
  };

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
  }, [activeTab]);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Створення публікації"
      headerBgColor={backgroundColor}
      openFrom={openFrom}>
      <View style={styles.container}>
        <TabsSwitch
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          headerStyle={{padding: 0}}>
          {tabContent[activeTab]}
        </TabsSwitch>
      </View>
      <Modal
        openFrom="right"
        visible={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        title="Категорії">
        <CategoriesList />
      </Modal>
      <Modal
        openFrom="right"
        visible={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        title="Локація">
        <SelectLocationList style={{padding: 20}} />
      </Modal>
    </Modal>
  );
};

export default AddItemModal;

const styles = StyleSheet.create({
  container: {
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
  selectDateButton: {
    flexShrink: 1,
    borderRadius: 10,
  },
  selectDateText: {
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
  },
});
