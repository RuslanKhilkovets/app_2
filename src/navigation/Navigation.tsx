import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {routes} from '@/routes';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        {routes.map((route, index) => {
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
  );
};

export default Navigation;
