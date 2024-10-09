import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
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
  ActivityIndicator,
  Share,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppIcon, Button, GoBack, ItemStatus} from '@/components';
import NoProfile from '@images/no_profile_pic.png';
import {useTheme} from '@/contexts/Theme/ThemeContext';
import {IItem, IUser} from '@/types';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';
import {DateFormatter} from '@/helpers';

type RouteParamsList = {
  MyRouteName: {
    id: string;
  };
};

const ItemScreen = () => {
  const {width: screenWidth} = Dimensions.get('window');

  const [activeSlide, setActiveSlide] = useState(0);
  const [data, setData] = useState<(IItem & {user: IUser | null}) | null>();
  const [phoneActive, setPhoneActive] = useState(false);
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const route = useRoute<RouteProp<RouteParamsList, 'MyRouteName'>>();

  const {id} = route.params || {};

  const {themes, colorScheme} = useTheme();
  const insets = useSafeAreaInsets();

  const {isLoading: isPostLoading, mutate: postMutate} = useAuthMutation({
    mutationFn: Api.posts.getById,
    onSuccess: res => {
      setData(res.data.data);
      setIsFavorite(res.data.data.is_favorite);

      const photos = res.data.data.photos.map(
        (photo: {url: string}) => photo.url,
      );
      setPhotos(photos);
    },
    onError: ({errors}) => {
      setError(errors?.message);
    },
  });

  const {isLoading: isFavoriteLoading, mutate: favoriteMutate} =
    useAuthMutation({
      mutationFn: Api.favorites.togglePost,
      onSuccess: res => {
        setIsFavorite(res.data.result);
      },
      onError: ({errors}) => {
        setError(errors?.message);
      },
    });

  const handleAddToFavourites = () => {
    favoriteMutate(id);
  };

  const handlePhonePress = () => {
    const phoneNumber = `tel:${data?.user?.phone}`;
    Linking.openURL(phoneNumber).catch(err =>
      console.error('Failed to open phone dialer', err),
    );
  };
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Поділіться цією публікацією: ${data?.name} - ${data?.body}`,
      });
    } catch (error) {
      console.error('Share Error: ', error);
    }
  };
  useEffect(() => {
    postMutate(id);
  }, []);

  return (
    <ScrollView>
      {data ? (
        <>
          <View style={[styles.head, {marginTop: insets.top}]}>
            <View
              style={[styles.actions, {paddingHorizontal: 16, paddingTop: 20}]}>
              <GoBack color="#fff" />
              <TouchableOpacity onPress={handleShare} activeOpacity={0.7}>
                <AppIcon name="share" color="#fff" size={25} />
              </TouchableOpacity>
            </View>

            {photos.length !== 0 ? (
              <>
                <Carousel
                  loop
                  data={photos}
                  renderItem={({item}) => (
                    <View style={styles.imgContainer}>
                      {item && (
                        <Image source={{uri: item}} style={styles.img} />
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
                  dotsLength={data?.photos.length || 1}
                  activeDotIndex={activeSlide}
                  containerStyle={styles.paginationContainer}
                  dotStyle={styles.paginationDot}
                  inactiveDotStyle={styles.inactiveDot}
                  inactiveDotOpacity={0.7}
                  inactiveDotScale={0.6}
                />
              </>
            ) : (
              <View style={styles.noImg}>
                <Text style={styles.noPhotoText}>Немає фото</Text>
              </View>
            )}
          </View>
          <View style={styles.block}>
            <Text style={styles.item_title}>
              {data.published_at !== null &&
                `Опубліковано ${data.published_at}`}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Text
                  style={[styles.title, {color: themes[colorScheme].dark}]}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {data?.name}
                </Text>
                <ItemStatus status={1} />
              </View>
              <TouchableOpacity
                onPress={handleAddToFavourites}
                activeOpacity={0.7}>
                <AppIcon
                  name={isFavorite ? 'liked_card' : 'favorite_menu'}
                  color={'red'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.block}>
            <Text style={[styles.item_title, {fontSize: 15}]}>Опис:</Text>
            <Text style={[styles.text, {color: themes[colorScheme].dark}]}>
              {data?.body}
            </Text>
          </View>
          <View style={styles.block}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <AppIcon name="location" color="#757575" />
              <Text
                style={[
                  styles.text,
                  {marginTop: 0, color: themes[colorScheme].dark},
                ]}>
                {data?.location?.name}
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
              <Text
                style={[
                  styles.text,
                  {marginTop: 0, color: themes[colorScheme].dark},
                ]}>
                Знайдено{' '}
                {DateFormatter.formatLocalizedDate(
                  new Date(data?.action_at),
                  true,
                )}
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
              <Text
                style={[styles.profileName, {color: themes[colorScheme].dark}]}>
                {data?.user?.name || 'Невідомий користувач'}
              </Text>
            </View>
            {data?.user?.phone && (
              <TouchableOpacity>
                {!phoneActive ? (
                  <Button type="secondary" onPress={() => setPhoneActive(true)}>
                    Показати телефон
                  </Button>
                ) : (
                  <Button type="secondary" onPress={handlePhonePress}>
                    {data?.user?.phone}
                  </Button>
                )}
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{marginHorizontal: 15, marginBottom: 35 + insets.bottom}}>
            <Button onPress={() => {}}>Написати</Button>
          </View>
        </>
      ) : (
        <ActivityIndicator style={{marginTop: 200}} size="large" />
      )}
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
    backgroundColor: '#757575',
  },
  noPhotoText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Raleway-Medium',
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
    width: 230,
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
