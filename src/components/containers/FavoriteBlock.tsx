import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';

interface IFavoriteBlock extends React.PropsWithChildren {
  title: string;
  style?: ViewStyle;
}

const FavoriteBlock = ({title, children, style}: IFavoriteBlock) => {
  return (
    <View style={[style, {marginTop: 20, flex: 1}]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default FavoriteBlock;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Raleway-SemiBold',
    color: '#000',
    fontSize: 22,
  },
});
