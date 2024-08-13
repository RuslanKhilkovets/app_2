import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import IStartSliderProps from '../../types/IStartSliderProps';
import { slidesLength } from '../slides';
import Slide1 from '../slides/Slide1';
import Slide3 from '../slides/Slide3';
import Slide2 from '../slides/Slide2';

const { width: screenWidth } = Dimensions.get('window');

const slides = [
  {component: Slide1},
  {component: Slide2},
  {component: Slide3},
];

const StartSlider = ({ activeSlide, setActiveSlide }: IStartSliderProps) => {

  console.log(slides)

  return (
    <View style={styles.container}>
      <Carousel
        data={slides}
        renderItem={({ item }) => <item.component />}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        layout={'default'}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={slidesLength}
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
    justifyContent: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 100,
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