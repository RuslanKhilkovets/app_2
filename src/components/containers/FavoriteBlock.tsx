import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface IFavoriteBlock extends React.PropsWithChildren {
  title: string;
}

const FavoriteBlock = ({title, children}: IFavoriteBlock) => {
  return (
    <View style={{marginTop: 20}}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default FavoriteBlock;

const styles = StyleSheet.create({
  title: {
    marginVertical: 18,
    fontFamily: 'Raleway-SemiBold',
    color: '#000',
    fontSize: 22,
  },
});
