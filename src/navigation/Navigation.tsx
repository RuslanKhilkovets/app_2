import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View} from 'react-native';
import {useSelector} from 'react-redux';
import SInfo from 'react-native-sensitive-info';

import {privateRoutes, publicRoutes, TabsNavigation} from '@/navigation';
import {IRoute} from '@/types';
import {Logo} from '@/components';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const {user} = useSelector(state => state);

  const getToken = async () => {
    const accessToken = await SInfo.getItem('accessToken', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
    return accessToken;
  };

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getToken();
      setIsAuth(!!accessToken);

      // Simulate loading for 5 seconds
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    };

    fetchToken();
  }, []);

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
          {isAuth
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
