import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';

import {
  AppIcon,
  CategoriesList,
  FilterModal,
  Input,
  ItemsContainer,
  Modal,
  SelectedFilterItem,
  TabsSwitch,
} from '@/components';
import TABS from '@/constants/Tabs';
import {IItem} from '@/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@/contexts/Theme/ThemeContext';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';

const SearchTab = () => {
  const [error, setError] = useState('');
  const [items, setItems] = useState<{[key: string]: IItem[]}>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(TABS.I_LOOKING_FOR);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const {themes, colorScheme} = useTheme();

  const {mutate} = useAuthMutation({
    mutationFn: Api.posts.getAll,
    onSuccess: res => {
      setItems(prev => ({
        ...prev,
        [activeTab]: res.data.data,
      }));
      setIsLoading(false);
    },
    onError: ({errors}) => {
      setError(errors?.message);
      setIsLoading(false);
    },
  });

  const onSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    if (!items[activeTab]) {
      setIsLoading(true);
      mutate({type: activeTab});
    }
  }, [activeTab]);

  const memoizedItems = useMemo(
    () => items[activeTab] || [],
    [items, activeTab],
  );

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
              endAdornment={
                <View style={styles.endAdornments}>
                  <AppIcon name="favorite_menu" size={20} />

                  <TouchableOpacity
                    style={[
                      styles.filterBtn,
                      {borderColor: themes[colorScheme].dark},
                    ]}
                    activeOpacity={0.7}
                    onPress={() => setIsFilterModalVisible(true)}>
                    <Text style={{color: themes[colorScheme].dark}}>
                      Фільтр
                    </Text>

                    <AppIcon size={10} name="filter" />
                  </TouchableOpacity>
                </View>
              }
            />

            <View style={styles.categories}>
              <SelectedFilterItem text="Луцьк" />
              <SelectedFilterItem
                filterMode
                text="Виберіть категорію"
                onPress={() => setIsCategoriesOpen(true)}
              />
            </View>
          </View>
        }>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={themes[colorScheme].primary}
            style={{marginTop: 100}}
          />
        ) : (
          <>
            {activeTab === TABS.I_LOOKING_FOR && (
              <ItemsContainer
                items={memoizedItems}
                style={{padding: 20}}
                containerStyle={{paddingBottom: insets.bottom}}
              />
            )}
            {activeTab === TABS.I_FIND && (
              <ItemsContainer
                items={memoizedItems}
                style={{padding: 20}}
                containerStyle={{paddingBottom: insets.bottom}}
              />
            )}
          </>
        )}
      </TabsSwitch>

      <Modal
        title="Категорії"
        visible={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
        openFrom="right">
        <CategoriesList />
      </Modal>

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
