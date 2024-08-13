import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import IStartSliderProps from '../../types/IStartSliderProps';
import { slides } from '../slides';


const { width: screenWidth } = Dimensions.get('window');

const StartSlider = ({ activeSlide, setActiveSlide }: IStartSliderProps) => {

  return (
    <View style={styles.container}>
      <Carousel
        data={slides}
        renderItem={ ({ item }) => <item.component/> }
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={index => setActiveSlide(index)}
        firstItem={activeSlide}
      />
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.activeDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
});

export default StartSlider;