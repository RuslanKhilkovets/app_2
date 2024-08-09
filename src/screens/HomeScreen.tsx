import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PostItem } from '../components/Post';

import axios from 'axios';
import Post from '../types/Post';
import { Text } from 'react-native-svg';


function HomeScreen( {navigation} ): React.JSX.Element {
  const [items, setItems] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isDarkMode = useColorScheme() === 'dark';

  const getData = async () => {
    setIsLoading(true);

    await axios.get('https://66b4aaf89f9169621ea3f045.mockapi.io/posts')
      .then(({data}) => {
        setItems(data);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', 'Something went wrong...');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []); 

  if(isLoading) {
    return (
      <SafeAreaView style={{ 
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size={"large"} />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getData} />}
        data={items}
        renderItem={({ item }) => 
          <TouchableOpacity 
            onPress={() => navigation.navigate('Post', { id: item.id, title: item.title})}
          >
            <PostItem id={item.id} image={item.image} title={item.title} data={item.data} />
          </TouchableOpacity>}
      />        
    </SafeAreaView>
  );
}

export default HomeScreen;