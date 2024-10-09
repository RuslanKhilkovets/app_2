import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {AppIcon} from '@/components';
import TABS from '@/constants/Tabs';
import {ICategory, ILocation} from '@/types';
import {FILTER_TYPE, StaticDateType} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {DateFormatter} from '@/helpers';
import STATIC_DATE_TYPE from '@/constants/StaticDateType';

interface ISearchItemProps {
  data: {
    id: string;
    is_favorite: boolean;
    value: {
      q: string;
      type: TABS;
      category?: ICategory | null;
      action_at_from?: string;
      action_at_to?: string;
      location?: ILocation | null;
      withPhoto: FILTER_TYPE;
      withBody: FILTER_TYPE;
      last: STATIC_DATE_TYPE;
    };
  };
}

const SearchItem = ({data}: ISearchItemProps) => {
  const {navigate} = useNavigation();
  const renderFilters = () => {
    let filtersStr = '';

    if (data.value?.category) {
      filtersStr += `Категорія: ${data?.value?.category?.name} / `;
    }
    if (data.value?.action_at_from && data.value?.action_at_to) {
      filtersStr += `Період: з ${DateFormatter.formatLocalizedDate(
        new Date(data.value.action_at_from),
      )} по ${DateFormatter.formatLocalizedDate(
        new Date(data.value.action_at_to),
      )} /`;
    }
    if (data.value?.location) {
      filtersStr += `Локація: ${data?.value?.location?.name} / `;
    }
    if (data.value?.withPhoto) {
      filtersStr += `З фото / `;
    }
    if (data.value?.withBody) {
      filtersStr += `З описом / `;
    }
    filtersStr += `За останній:  ${
      data?.value?.last === StaticDateType.MONTH ? 'місяць' : 'тиждень'
    }`;

    return filtersStr;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() =>
        navigate('search-tab', {
          filters: data?.value,
          is_favorite: data?.is_favorite,
          id: data?.id,
        })
      }>
      <View style={styles.mainContent}>
        <AppIcon name="edit" />
        <View style={styles.textContainer}>
          {data?.value?.q !== null && (
            <Text style={styles.name}>{data?.value?.q || ''}</Text>
          )}
          <Text style={styles.filters}>{renderFilters()}</Text>
        </View>
      </View>

      <View style={styles.rightContent}>
        {/* {!!data.value.results && data.value.results !== 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.results}>{data.value.results}</Text>
          </View>
        )} */}
        <Pressable>
          <AppIcon name="arrow" size={12} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 16,
    borderRadius: 10,
    backgroundColor: '#F8F6F6',
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: 15,
    gap: 5,
    flex: 1,
  },
  name: {
    fontFamily: 'Raleway-Regular',
    color: '#000',
    fontSize: 15,
  },
  filters: {
    fontFamily: 'Raleway-Regular',
    color: '#757575',
    fontSize: 15,
    lineHeight: 18,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  resultsContainer: {
    backgroundColor: '#FF879D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7.5,
    paddingTop: 1,
    paddingBottom: 3,
    borderRadius: 14,
  },
  results: {
    color: '#fff',
    fontFamily: 'Raleway-Medium',
    fontSize: 15,
  },
});
