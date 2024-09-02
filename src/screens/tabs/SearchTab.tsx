import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';

import {
  AppIcon,
  FilterModal,
  Input,
  ItemsContainer,
  SelectedFilterItem,
  TabsSwitch,
} from '@/components';
import TABS from '@/constants/Tabs';
import {IItem} from '@/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(TABS.I_LOOKING_FOR);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const insets = useSafeAreaInsets();

  const onSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const searchInputEndAdornment = (
    <View style={styles.endAdornments}>
      <AppIcon name="favorite_menu" size={20} />

      <TouchableOpacity
        style={styles.filterBtn}
        activeOpacity={0.7}
        onPress={() => setIsFilterModalVisible(true)}>
        <Text>Фільтр</Text>

        <AppIcon size={10} name="filter" />
      </TouchableOpacity>
    </View>
  );

  const items: IItem[] = [
    {id: '4', title: 'Ipho', city: 'Луцьк', date: '8 fdddd 2022'},
    {id: '5', title: 'Iphone 1', city: 'Луцьк', date: '8 серпняffff 2022'},
    {
      id: '3',
      title:
        'Iphone 12fdsdfkkllkledrfgbhnjmkl,kmjinhbugyfvtdsadfghjkl;;lkjhgfdsdsdf',
      city: 'Луffdsfцьк',
      date: '8 серпня 2022',
    },
    {id: '4', title: 'Ipho', city: 'Луцьк', date: '8 fdddd 2022'},
    {id: '5', title: 'Iphone 1', city: 'Луцьк', date: '8 серпняffff 2022'},
  ];

  return (
    <>
      <TabsSwitch
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        header={
          <View style={{paddingTop: insets.top}}>
            <Input
              value={searchQuery}
              onChangeText={onSearchChange}
              placeholder="Пошук..."
              endAdornment={searchInputEndAdornment}
            />

            <View style={styles.categories}>
              <SelectedFilterItem text="Луцьк" />
              <SelectedFilterItem filterMode text="Виберіть категорію" />
            </View>
          </View>
        }>
        {activeTab === TABS.I_LOOKING_FOR && (
          <ScrollView style={{backgroundColor: '#fff', height: 520}}>
            <ItemsContainer items={items} style={{padding: 20}} />
          </ScrollView>
        )}
        {activeTab === TABS.I_FIND && (
          <ScrollView style={{backgroundColor: '#fff', height: 520}}>
            <ItemsContainer items={items} style={{padding: 20}} />
          </ScrollView>
        )}
      </TabsSwitch>

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
      />
    </>
  );
};

export default SearchTab;

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  endAdornments: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10.5,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  categories: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
  },
  tabsSwitchersContainer: {
    position: 'relative',
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabsSwitcher: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  tabContent: {
    padding: 16,
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
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
});
