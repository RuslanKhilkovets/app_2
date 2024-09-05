import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {routes} from '@/navigation';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs">
          {routes.map(route => {
            return (
              <Stack.Screen
                {...route}
                key={route.name}
                options={{headerShown: false}}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
