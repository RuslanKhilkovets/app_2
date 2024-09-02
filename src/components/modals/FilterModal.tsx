import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

import {
  FilterItem,
  Modal,
  EditButton,
  Button,
  Checkbox,
  DatePicker,
  CategoriesList,
  SelectLocationList,
  AppIcon,
} from '@/components';
import {IModalProps} from '@/types';
import {formatDate, nullToDash} from '@/helpers';
import TABS from '@/constants/Tabs';

enum FILTER_TYPE {
  WITH_DESCRIPTION = 1,
  WITH_PIC = 2,
}

enum STATIC_DATE_TYPE {
  WEEK = 1,
  MONTH = 2,
}

const FilterModal = ({visible, onClose}: IModalProps) => {
  const [activeTab, setActiveTab] = useState(TABS.I_LOOKING_FOR);
  const [selectedValues, setSelectedValues] = useState<FILTER_TYPE[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [staticDateType, setStaticDateType] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const handleChooseStaticDate = (type: STATIC_DATE_TYPE | null) => {
    setStartDate(null);
    setEndDate(null);

    setStaticDateType(type);
  };

  const handleValueChange = (value: any) => {
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value],
    );
  };

  const underlinePosition = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

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

  const tabContent = {
    [TABS.I_LOOKING_FOR]: (
      <View style={styles.tabContent}>
        <ScrollView>
          <FilterItem title="Категорія">
            <EditButton
              title="Вибрати категорію"
              onPress={() => setCategoryModalOpen(true)}
            />
          </FilterItem>
          <FilterItem title="Дата публікації">
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.dateButton,
                  staticDateType === STATIC_DATE_TYPE.WEEK && {
                    borderColor: '#000',
                  },
                ]}
                onPress={() => handleChooseStaticDate(STATIC_DATE_TYPE.WEEK)}>
                <Text
                  style={[
                    styles.dateButtonText,
                    staticDateType === STATIC_DATE_TYPE.WEEK && {
                      fontFamily: 'Raleway-SemiBold',
                    },
                  ]}>
                  За останній тиждень
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.dateButton,
                  staticDateType === STATIC_DATE_TYPE.MONTH && {
                    borderColor: '#000',
                  },
                ]}
                onPress={() => handleChooseStaticDate(STATIC_DATE_TYPE.MONTH)}>
                <Text
                  style={[
                    styles.dateButtonText,
                    staticDateType === STATIC_DATE_TYPE.MONTH && {
                      fontFamily: 'Raleway-SemiBold',
                    },
                  ]}>
                  Останній місяць
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 14,
                gap: 16,
                alignItems: 'center',
              }}>
              <Text style={styles.selectDateText}>З</Text>

              <DatePicker
                setOpen={() => setOpenStartDatePicker(true)}
                maxDate={endDate || new Date()}
                date={startDate}
                isOpen={openStartDatePicker}
                onClose={() => setOpenStartDatePicker(false)}
                onChange={date => setStartDate(date)}
              />

              <Text style={styles.selectDateText}>до</Text>

              <DatePicker
                setOpen={() => setOpenEndDatePicker(true)}
                date={endDate}
                maxDate={new Date()}
                minDate={startDate || null}
                isOpen={openEndDatePicker}
                onClose={() => setOpenEndDatePicker(false)}
                onChange={date => setEndDate(date)}
              />
            </View>
          </FilterItem>
          <FilterItem title="Локація">
            <EditButton
              title="Луцьк"
              onPress={() => setLocationModalOpen(true)}
            />
          </FilterItem>
          <View style={{flexDirection: 'row', gap: 60, marginVertical: 30}}>
            <Checkbox
              label="З описом"
              value={FILTER_TYPE.WITH_DESCRIPTION}
              onValueChange={handleValueChange}
              checked={selectedValues.includes(FILTER_TYPE.WITH_DESCRIPTION)}
            />
            <Checkbox
              label="З фото"
              value={FILTER_TYPE.WITH_PIC}
              onValueChange={handleValueChange}
              checked={selectedValues.includes(FILTER_TYPE.WITH_PIC)}
            />
          </View>
        </ScrollView>

        <Button onPress={() => {}}>Застосувати</Button>
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
      </View>
    ),
    [TABS.I_FIND]: (
      <View style={styles.tabContent}>
        <Text>Tab Two Content</Text>
      </View>
    ),
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

  useEffect(() => {
    if (startDate || endDate) {
      setStaticDateType(null);
    }

    setOpenStartDatePicker(false);
    setOpenEndDatePicker(false);
  }, [startDate, endDate]);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Фільтр"
      headerBgColor={backgroundColor}>
      <View style={styles.container}>
        <Animated.View
          style={[styles.tabsSwitchersContainer, {backgroundColor}]}>
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
    paddingBottom: 10,
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
