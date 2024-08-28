import {View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {FilterItem, Input, SelectLocationItem} from '@/components';

interface ISelectLocationListProps {
  currentLocation?: string;
  style?: ViewStyle;
}

const cities = ['Київ', 'Харків', 'Одеса', 'Дніпро', 'Львів'];

const SelectLocationList = ({
  currentLocation = 'Луцьк',
  style,
}: ISelectLocationListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View style={style}>
      <Input
        value={searchQuery}
        onChangeText={handleQueryChange}
        placeholder="Пошук"
        searchMode
      />

      <FilterItem title="Ваша локація">
        <SelectLocationItem location="Луцьк" borderColor="#FF879D" />
      </FilterItem>

      <FilterItem title="Великі міста">
        {cities.map((city: string) => {
          return <SelectLocationItem location={city} />;
        })}
      </FilterItem>
    </View>
  );
};

export default SelectLocationList;
