import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import Slide1 from '../slides/Slide1';
import Slide2 from '../slides/Slide2';
import Slide3 from '../slides/Slide3';

const {width: screenWidth} = Dimensions.get('window');

const slides = [
  {component: <Slide1 />},
  {component: <Slide2 />},
  {component: <Slide3 />},
];

const StartSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <View style={{flex: 1}}>
      <Carousel
        data={slides}
        renderItem={({item}) => item.component}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        layout={'tinder'}
        onSnapToItem={index => setActiveSlide(index)}
      />

      <Pagination
        dotsLength={slides.length}
        activeDotIndex={activeSlide}
        containerStyle={{position: 'absolute', bottom: 30, alignSelf: 'center'}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default StartSlider;
