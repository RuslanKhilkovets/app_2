import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface IFilterItemProps extends React.PropsWithChildren {
  title: string;
}

const FilterItem = ({title, children}: IFilterItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>

      {children}
    </View>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  container: {},
  text: {
    marginVertical: 14,
    color: '#AFAFAF',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Raleway-Regular',
  },
});
