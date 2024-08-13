import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StartSlider from '../components/StartSLider/StartSlider';
import StartSliderActionsButtons from '../components/StartSliderActionsButtons';
import { slidesLength } from '../components/slides';

const StartSliderScreen = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const handleNextSlide = () => {
        if (activeSlide < slidesLength) {
            setActiveSlide(activeSlide + 1);
        }
    };

    return (
        <View style={styles.container}>
            <StartSlider  
                activeSlide={activeSlide} 
                setActiveSlide={setActiveSlide}
            />

            <StartSliderActionsButtons onNext={handleNextSlide} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default StartSliderScreen;