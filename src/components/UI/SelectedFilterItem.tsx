import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppIcon from '@/components/base/AppIcon';

interface ISelectedFilterItemProps {
  text: string;
  filterMode?: boolean;
  icon?: React.JSX.Element;
}

const SelectedFilterItem = ({
  text,
  filterMode,
  icon,
}: ISelectedFilterItemProps) => {
  return (
    <View>
      <TouchableOpacity style={styles.container} activeOpacity={0.7}>
        <Text style={styles.text}>{text}</Text>

        <AppIcon size={12} name={filterMode ? 'arrow' : 'delete_filter'} />
      </TouchableOpacity>
    </View>
  );
};

export default SelectedFilterItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontFamily: 'Raleway-Regular',
  },
});
