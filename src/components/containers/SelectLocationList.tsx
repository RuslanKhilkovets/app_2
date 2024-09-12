import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, View, ViewStyle} from 'react-native';

import {FilterItem, Input, SelectLocationItem} from '@/components';
import {Api} from '@/api';
import {useAuthMutation} from '@/hooks';
import {ILocation} from '@/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ISelectLocationListProps {
  location: ILocation;
  style?: ViewStyle;
  setLocation: React.Dispatch<React.SetStateAction<ILocation>>;
}

const SelectLocationList = ({
  style,
  location,
  setLocation,
}: ISelectLocationListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [locationsList, setLocationsList] = useState<ILocation[]>([]);
  const [error, setError] = useState('');

  const insets = useSafeAreaInsets();

  const handleQueryChange = (text: string) => {
    setSearchQuery(text);
  };

  const {isLoading, mutate} = useAuthMutation({
    mutationFn: Api.suggest.getLocations,
    onSuccess: res => {
      setLocationsList(res.data.data);
    },
    onError: ({errors}) => {
      setError(errors?.message);
    },
  });

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 100);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    mutate({q: debouncedQuery});
  }, [debouncedQuery]);

  return (
    <ScrollView style={[style, {marginBottom: insets.bottom + 30}]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Input
            value={searchQuery}
            onChangeText={handleQueryChange}
            placeholder="Пошук"
            searchMode
          />
          <FilterItem title="Ваша локація">
            <SelectLocationItem
              location={location}
              borderColor="#FF879D"
              setLocation={setLocation}
            />
          </FilterItem>
          <FilterItem title="Великі міста">
            {locationsList.map((loc: ILocation) => {
              return (
                <SelectLocationItem
                  key={loc.id}
                  location={loc}
                  setLocation={setLocation}
                />
              );
            })}
          </FilterItem>
        </>
      )}
    </ScrollView>
  );
};

export default SelectLocationList;
