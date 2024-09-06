import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {AppIcon} from '@/components';

interface ISearchItemProps {
  data: {
    id: number;
    name: string;
    category?: string;
    dateFrom?: string;
    dateTo?: string;
    location?: string;
    photo?: boolean;
    results?: number;
  };
}

const SearchItem = ({data}: ISearchItemProps) => {
  const renderFilters = () => {
    let filtersStr = '';

    if (data.category) {
      filtersStr += `Категорія: ${data.category} / `;
    }
    if (data.dateFrom || data.dateTo) {
      filtersStr += `Період: з ${data.dateFrom} по ${data.dateTo} /`;
    }
    if (data.location) {
      filtersStr += `Локація: ${data.location} / `;
    }
    if (data.photo) {
      filtersStr += `З фото`;
    }

    return filtersStr;
  };

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <View style={styles.mainContent}>
        <AppIcon name="edit" />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.filters}>{renderFilters()}</Text>
        </View>
      </View>

      <View style={styles.rightContent}>
        {!!data.results && data.results !== 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.results}>{data.results}</Text>
          </View>
        )}
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
