import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';
import Post from '../types/Post';
import Loading from '../components/Loading';



const PostImage = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  background-color: rgb(0, 0, 0);
`;

const PostText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;


const FullPostScreen = ( {route, navigation} ) => {
    const [data, setData] = useState<Post>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { id, title } = route.params;


    const getData = async () => {
        setIsLoading(true);
    
        await axios.get(`https://66b4aaf89f9169621ea3f045.mockapi.io/posts/${id}`)
        .then(({data}) => {
          setData(data);
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Error', 'Can\'t get an article...');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
      
    useEffect(() => {
        navigation.setOptions({
          title,
        })
        getData();
    },[])

    if(isLoading) {
        return (
          <Loading />
        );
      }

    return (
        <View style={{padding: 20, gap: 20}}>
            <PostImage source={{ uri: data.image }} resizeMode="cover" />
            <PostText>{data.title}</PostText>
        </View>
    );
};

export default FullPostScreen;