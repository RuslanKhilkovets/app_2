import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

interface IPrivacyPolicyBlockProps extends React.PropsWithChildren {
  title: string;
}

const PrivacyPolicyBlock = ({title, children}: IPrivacyPolicyBlockProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    textTransform: 'uppercase',
    lineHeight: 19,
    fontSize: 16,
    color: '#000',
  },
});

export default PrivacyPolicyBlock;
