import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Slide3 = () => {
  return (
    <View style={styles.slide}>
      <Image
        style={styles.characterImage}
        source={require('../../../assets/images/character_4.png')}
      />
      <View style={styles.mainContent}>

      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Знайшов згубу?
        </Text>
      </View>
      <Image source={require('../../../assets/images/menu_3.png')} style={styles.menuImage} />
      <Text style={styles.slideDescription}>
        За допомогою фільтру ти швидше найдеш
        загублену річ, або зможеш віддати знахідку 
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    backgroundColor: '#FFEAEA',
    flex: 1,
    alignItems: 'center',
    paddingTop: 54,
  },
  mainContent: {
    marginTop: 80
  },
  characterImage: {
    width: 210,
    height: 350,
    position: "absolute",
    zIndex: -1,
    bottom: 30,
    left: 0,
  },
  title: {
    width: 300,
    color: "#000",
    fontWeight: "700",
    fontSize: 26,
    fontFamily: "Raleway-SemiBold",
    lineHeight: 26,
    textAlign: "center"
  },
  titleContainer: {
    position: "relative"
  },
  titleAfterElement: {
    position: "absolute",
    right: -5,
    top: 25
  },
  menuImage: {
    marginTop: 40,
    width: "100%"
  },
  slideDescription: {
    marginTop: 20,
    maxWidth: 320,
    fontSize: 15,
    fontFamily: "Raleway-Regular",
    lineHeight: 17,
    textAlign: "center",
    color: "#000",
    fontWeight: "400"
  }
});

export default Slide3;