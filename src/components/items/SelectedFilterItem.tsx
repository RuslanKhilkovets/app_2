import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AppIcon from '@/components/UI/AppIcon';
import {useTheme} from '@/contexts/Theme/ThemeContext';

interface ISelectedFilterItemProps {
  text: string;
  filterMode?: boolean;
  icon?: React.JSX.Element;
  onPress?: () => void;
  removeItem?: () => void;
}

const SelectedFilterItem = ({
  text,
  filterMode,
  icon,
  onPress,
  removeItem,
}: ISelectedFilterItemProps) => {
  const {themes, colorScheme} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: themes[colorScheme].light}]}
      activeOpacity={1}>
      <Text style={[styles.text, {color: themes[colorScheme].dark}]}>
        {text}
      </Text>
      <Pressable onPress={removeItem}>
        <AppIcon size={12} name={filterMode ? 'arrow' : 'delete_filter'} />
      </Pressable>
    </TouchableOpacity>
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
    marginRight: 10,
  },
  text: {
    fontFamily: 'Raleway-Regular',
  },
});
