import React, {useContext, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View} from 'react-native';

import {privateRoutes, publicRoutes} from '@/navigation';
import {IRoute} from '@/types';
import {Logo} from '@/components';
import {AuthContext} from '@/contexts/Auth/AuthContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [loading, setLoading] = useState(false);
  const {accessToken} = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Logo animated />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent
      />
      <NavigationContainer>
        <Stack.Navigator>
          {!!accessToken
            ? privateRoutes.map((route: IRoute) => (
                <Stack.Screen
                  {...route}
                  key={route.name}
                  options={{headerShown: false}}
                />
              ))
            : publicRoutes.map((route: IRoute) => (
                <Stack.Screen
                  {...route}
                  key={route.name}
                  options={{headerShown: false}}
                />
              ))}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
