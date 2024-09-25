import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';

interface IFilterItemProps extends React.PropsWithChildren {
  title: string;
  style?: ViewStyle;
}

const FilterItem = ({title, children, style}: IFilterItemProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{title}</Text>

      {children}
    </View>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  text: {
    marginVertical: 14,
    color: '#AFAFAF',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Raleway-Regular',
  },
});
