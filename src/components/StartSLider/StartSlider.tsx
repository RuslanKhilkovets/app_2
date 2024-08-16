import React, {useRef, useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {StartSliderActionsButtons} from '@/components';
import {slides} from '../slides';

const StartSlider = () => {
  const {width: screenWidth} = Dimensions.get('window');

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<Carousel<any>>(null);

  const onNext = () => {
    carouselRef.current?.snapToNext();
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={slides}
        renderItem={({item}) => <item.component />}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={index => setActiveSlide(index)}
        firstItem={activeSlide}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        ref={carouselRef}
      />
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.activeDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <StartSliderActionsButtons activeSlide={activeSlide} onNext={onNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 140,
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
