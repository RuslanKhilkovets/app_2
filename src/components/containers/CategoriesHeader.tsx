import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {defaultLocation} from '@/constants/globals';
import {AppIcon, Input} from '@/components';

interface ICategotiesHeaderProps {
  searchQuery: string;
  setSearchQuery: (state: string) => void;
}

const CategoriesHeader = ({
  searchQuery,
  setSearchQuery,
}: ICategotiesHeaderProps) => {
  return (
    <View>
      <View style={styles.circle}></View>

      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Локація:</Text>

        <TouchableOpacity activeOpacity={0.7} style={styles.changeLocationBtn}>
          <Text style={styles.activeLocationText}>{defaultLocation}</Text>

          <AppIcon name="arrow" size={15} />
        </TouchableOpacity>
      </View>

      <Input
        searchMode
        value={searchQuery}
        onChangeText={(text: string) => setSearchQuery(text)}
        placeholder="Пошук"
        inputStyle={{
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      />
    </View>
  );
};

export default CategoriesHeader;

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    top: -747,
    left: -261,
    backgroundColor: '#FF879D',
    height: 883,
    width: 883,
    borderRadius: 441.5,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 30,
  },
  changeLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
  },
  activeLocationText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 22,
  },
});
