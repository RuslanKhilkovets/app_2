import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import FullPostScreen from './FullPost';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="News" component={HomeScreen} />
                <Stack.Screen name="Post" component={FullPostScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;