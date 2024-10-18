import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {AppIcon, Input, LocationModal} from '@/components';
import {ILocation} from '@/types';

interface ICategotiesHeaderProps {
  searchQuery: string;
  setSearchQuery: (state: string) => void;
  location: ILocation | null;
  setLocation: React.Dispatch<React.SetStateAction<ILocation | null>>;
}

const CategoriesHeader = ({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
}: ICategotiesHeaderProps) => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    setIsLocationModalOpen(false);
  }, [location]);

  return (
    <View style={{padding: 16}}>
      <View style={styles.circle}></View>

      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Локація:</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.changeLocationBtn}
          onPress={() => setIsLocationModalOpen(true)}>
          <Text style={styles.activeLocationText}>
            {location?.name || 'Виберіть локацію'}
          </Text>

          <AppIcon name="arrow" size={15} />
        </TouchableOpacity>
      </View>

      <Input
        searchMode
        value={searchQuery}
        onChangeText={(text: string) => setSearchQuery(text)}
        placeholder="Пошук"
      />

      <LocationModal
        location={location}
        visible={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        setLocation={setLocation}
      />
    </View>
  );
};

export default CategoriesHeader;

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    top: -725,
    left: -250,
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
    color: '#000',
  },
  activeLocationText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 22,
    color: '#000',
  },
});
