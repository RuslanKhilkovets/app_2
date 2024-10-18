import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect, useRoute} from '@react-navigation/native';

import {
  AppIcon,
  CategoriesModal,
  FilterModal,
  Input,
  ItemsContainer,
  SelectedFilterItem,
  TabsSwitch,
} from '@/components';
import ContentType from '@/constants/ContentType';
import {ICategory, IFilters, IItem, ILocation} from '@/types';
import {useTheme} from '@/contexts/Theme/ThemeContext';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';
import {DateFormatter, showMessage} from '@/helpers';
import STATIC_DATE_TYPE from '@/constants/StaticDateType';

const SearchTab = () => {
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const {themes, colorScheme} = useTheme();

  // Initialize filters from route parameters or set default values
  const initialFilters: IFilters = route.params?.filters || {
    action_at_from: null,
    action_at_to: null,
    category: null,
    location: null,
    last: undefined,
    type: undefined,
    withPhoto: undefined,
    withBody: undefined,
  };

  // State variables
  const [isFilterFavorite, setIsFilterFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<ContentType>(
    route.params?.filters?.type || ContentType.I_LOOKING_FOR,
  );
  const [items, setItems] = useState<{[key: ContentType]: IItem[]}>({});
  const [searchQuery, setSearchQuery] = useState(initialFilters.q || '');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterId, setFilterId] = useState(route?.params?.id || null);

  const [filters, setFilters] = useState<IFilters>({
    ...initialFilters,
    category: route?.params?.category,
    location: route?.params?.location,
  });

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
      showMessage('error', errors.message);
      setIsLoading(false);
    },
  });

  const {isLoading: isAddFavoritePostsLoading, mutate: addFavoriteFilter} =
    useAuthMutation({
      mutationFn: Api.favorites.createFilter,
      onSuccess: res => {
        filterId !== null && filterId !== route?.params?.id
          ? saveFilterById(filterId)
          : saveFilterById(res.data.data.id);
        setFilterId(res.data.data.id);
      },
      onError: ({errors}) => {
        showMessage('error', errors?.message);
      },
    });

  const {mutate: saveFilterById} = useAuthMutation({
    mutationFn: Api.favorites.toggleFilter,
    onSuccess: res => {
      setIsFilterFavorite(res.data.result);
    },
    onError: ({errors}) => {
      showMessage('error', errors?.message);
    },
  });

  const onAddOrToggleFavoriteFilter = () => {
    if (
      filterId !== null ||
      (route?.params?.id && filterId === route?.params?.id)
    ) {
      saveFilterById(filterId);
    } else {
      addFavoriteFilter({...filters, q: searchQuery});
    }
  };

  const onSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const refreshItems = () => {
    setIsLoading(true);
    mutate({
      ...filters,
      type: activeTab,
      location: filters?.location?.id,
      category: filters?.category?.id,
      q: searchQuery,
    });
  };

  useEffect(() => {
    refreshItems();
  }, [filters, activeTab]);

  useEffect(() => {
    setFilters(prev => ({...prev, type: activeTab}));
  }, [activeTab]);

  useEffect(() => {
    setFilters(prev => ({...prev, q: searchQuery}));
  }, [searchQuery]);

  useEffect(() => {
    setIsCategoriesOpen(false);
  }, [filters.category]);

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.filters) {
        setFilters(route.params.filters);
        setActiveTab(route?.params?.filters?.type);
      }
    }, [route?.params?.filters]),
  );

  useFocusEffect(
    useCallback(() => {
      refreshItems();

      if (JSON.stringify(filters) !== JSON.stringify(route?.params?.filters)) {
        setIsFilterFavorite(false);
        setFilterId(null);
      } else {
        setIsFilterFavorite(true);
        setFilterId(route?.params?.id);
      }
    }, [filters, route?.params?.filters]),
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
                  <Pressable onPress={onAddOrToggleFavoriteFilter}>
                    <AppIcon
                      name={
                        isFilterFavorite
                          ? 'favorite_bold_menu'
                          : 'favorite_menu'
                      }
                      color={isFilterFavorite ? 'red' : 'black'}
                      size={20}
                    />
                  </Pressable>
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
                    <AppIcon size={10} name={'filter'} />
                  </TouchableOpacity>
                </View>
              }
            />

            <ScrollView style={styles.categories} horizontal>
              {filters?.category?.name ? (
                <SelectedFilterItem
                  text={filters?.category?.name}
                  removeItem={() =>
                    setFilters(prev => ({...prev, category: null}))
                  }
                />
              ) : (
                <SelectedFilterItem
                  filterMode
                  text="Виберіть категорію"
                  onPress={() => setIsCategoriesOpen(true)}
                />
              )}
              {filters?.location?.name ? (
                <SelectedFilterItem
                  text={filters?.location?.name}
                  removeItem={() =>
                    setFilters(prev => ({...prev, location: null}))
                  }
                />
              ) : null}
              {filters?.action_at_from ? (
                <SelectedFilterItem
                  text={`3 ${DateFormatter.formatLocalizedDate(
                    new Date(filters?.action_at_from),
                  )}`}
                  removeItem={() =>
                    setFilters(prev => ({...prev, action_at_from: null}))
                  }
                />
              ) : null}
              {filters?.action_at_to && (
                <SelectedFilterItem
                  text={`По ${DateFormatter.formatLocalizedDate(
                    new Date(filters?.action_at_to),
                  )}`}
                  removeItem={() =>
                    setFilters(prev => ({...prev, action_at_to: null}))
                  }
                />
              )}
              {filters?.last && (
                <SelectedFilterItem
                  text={`${
                    filters?.last === STATIC_DATE_TYPE.MONTH
                      ? 'За останній місяць'
                      : 'За останній тиждень'
                  }`}
                  removeItem={() => setFilters(prev => ({...prev, last: null}))}
                />
              )}
              {filters?.withBody ? (
                <SelectedFilterItem
                  text="З описом"
                  removeItem={() =>
                    setFilters(prev => ({...prev, withBody: null}))
                  }
                />
              ) : null}
              {filters?.withPhoto ? (
                <SelectedFilterItem
                  text="З фото"
                  removeItem={() =>
                    setFilters(prev => ({...prev, withPhoto: null}))
                  }
                />
              ) : null}
            </ScrollView>
          </View>
        }>
        <View style={{backgroundColor: '#fff', minHeight: 550}}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={themes[colorScheme].primary}
              style={{marginTop: 100}}
            />
          ) : (
            <ItemsContainer
              items={items[activeTab]}
              style={{padding: 20}}
              containerStyle={{paddingBottom: insets.bottom}}
            />
          )}
        </View>
      </TabsSwitch>

      <CategoriesModal
        onClose={() => setIsCategoriesOpen(false)}
        visible={isCategoriesOpen}
        setCategory={(category: ICategory) =>
          setFilters(prev => ({...prev, category}))
        }
      />

      <FilterModal
        setFilters={setFilters}
        filters={filters}
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
      />
    </>
  );
};

export default SearchTab;

const styles = StyleSheet.create({
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
    marginVertical: 10,
  },
});
