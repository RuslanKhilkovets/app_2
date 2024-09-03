import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppIcon, Button, GoBack, ItemStatus} from '@/components';
import NoProfile from '@images/no_profile_pic.png';

const ItemScreen = () => {
  const [phoneActive, setPhoneActive] = useState(false);
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const {id} = route.params || {};
  const {width: screenWidth} = Dimensions.get('window');

  const images = [
    {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnsaDG81Hj7mKMcUPrBvlxSt8Wd2M8BdACzw&s',
    },
    {
      uri: 'https://img.freepik.com/premium-photo/iphone-15-pro-black-background_946696-2759.jpg',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const handlePhonePress = () => {
    const phoneNumber = 'tel:0959998877';
    Linking.openURL(phoneNumber).catch(err =>
      console.error('Failed to open phone dialer', err),
    );
  };

  return (
    <ScrollView>
      <View style={[styles.head, {marginTop: insets.top}]}>
        <View style={[styles.actions, {paddingHorizontal: 16, paddingTop: 20}]}>
          <GoBack color="#fff" />
          <Pressable>
            <AppIcon name="share" color="#fff" size={25} />
          </Pressable>
        </View>

        <Carousel
          loop
          data={images}
          renderItem={({item}) => (
            <View style={styles.imgContainer}>
              {item.uri ? (
                <Image source={{uri: item.uri}} style={styles.img} />
              ) : (
                <View style={styles.noImg}>
                  <Text>Немає фото</Text>
                </View>
              )}
            </View>
          )}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          onSnapToItem={index => setActiveSlide(index)}
        />

        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={0.7}
          inactiveDotScale={0.6}
        />
      </View>
      <View style={styles.block}>
        <Text style={styles.item_title}>Опубліковано 8 серпня 2022</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text style={styles.title}>Iphone 15</Text>
            <ItemStatus status={1} />
          </View>

          <AppIcon name="favorite_menu" />
        </View>
      </View>
      <View style={styles.block}>
        <Text style={[styles.item_title, {fontSize: 15}]}>Опис:</Text>
        <Text style={styles.text}>Був знайдений під сидінням в таксі</Text>
      </View>
      <View style={styles.block}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <AppIcon name="location" color="#757575" />
          <Text style={[styles.text, {marginTop: 0}]}>
            Знайдено 8 серпня 2022
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <AppIcon name="calendar" color="#757575" />
          <Text style={[styles.text, {marginTop: 0}]}>
            м. Луцьк, Волинська область
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
          }}>
          <View style={styles.profileImage}>
            <Image style={styles.img} source={NoProfile} />
          </View>
          <Text style={styles.profileName}>Діана</Text>
        </View>

        <TouchableOpacity>
          {!phoneActive ? (
            <Button type="secondary" onPress={() => setPhoneActive(true)}>
              Показати телефон
            </Button>
          ) : (
            <Button type="secondary" onPress={handlePhonePress}>
              095 999 88 77
            </Button>
          )}
        </TouchableOpacity>
      </View>

      <View style={{marginHorizontal: 15, marginBottom: 35 + insets.bottom}}>
        <Button onPress={() => {}}>Написати</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  profileName: {
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
  },
  head: {
    position: 'relative',
    width: '100%',
    height: 360,
  },
  actions: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 9,
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  noImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  block: {
    paddingHorizontal: 16,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#e7e3e3',
  },
  title: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 22,
  },
  item_title: {
    color: '#AFAFAF',
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
  },
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    marginTop: 10,
  },
});

export default ItemScreen;
