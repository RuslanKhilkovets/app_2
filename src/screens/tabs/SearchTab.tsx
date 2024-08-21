import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  AppIcon,
  FilterModal,
  Input,
  Item,
  SelectedFilterItem,
} from '@/components';

enum TABS {
  I_LOOKING_FOR = 1,
  I_FIND = 2,
}

const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(TABS.I_LOOKING_FOR);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const underlinePosition = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(underlinePosition, {
      toValue: activeTab === TABS.I_LOOKING_FOR ? 0 : 1,
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

  const items = [
    {id: '1', title: 'Iphone 12', city: 'Луцьк', date: '8 серпня 2022'},
    {id: '2', title: 'Iphone 123', city: 'Луцьк', date: '8 серпня 2022'},
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
    <SafeAreaView style={{flex: 1}}>
      <Animated.View
        style={[styles.container, {backgroundColor: backgroundColor}]}>
        <View style={[styles.header]}>
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

        <View style={styles.tabsSwitchersContainer}>
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
        </View>
      </Animated.View>

      <Animated.View style={{opacity: contentOpacity, flex: 1}}>
        {activeTab === TABS.I_FIND && (
          <FlatList
            data={items}
            renderItem={({item}) => (
              <Item title={item.title} city={item.city} date={item.date} />
            )}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.tabContent}
          />
        )}

        {activeTab === TABS.I_LOOKING_FOR && (
          <ScrollView style={styles.tabContent}>
            <Text>i looking for</Text>
          </ScrollView>
        )}
      </Animated.View>

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
      />
    </SafeAreaView>
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
