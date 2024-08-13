import React, { useState } from 'react';
import { Text, View } from 'react-native';
import StartSlider from '../components/StartSLider/StartSlider';
import StartSliderActionsButtons from '../components/StartSliderActionsButtons';

const StartSliderScreen = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <View>
            <StartSlider  
                activeSlide={activeSlide} 
                setActiveSlide={setActiveSlide}
            />

            <StartSliderActionsButtons/>
        </View>
    );
}

export default StartSliderScreen;