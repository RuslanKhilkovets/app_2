import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import SInfo from 'react-native-sensitive-info';

import HatIcon from '@icons/hat.svg';
import EditIcon from '@icons/edit.svg';
import NoProfilePic from '@images/no_profile_pic.png';
import {
  Button,
  EditButton,
  FilterItem,
  ExitDialog,
  PicImageDialog,
} from '@/components';
import {useTheme} from '@/contexts/Theme/ThemeContext';
import {Api} from '@/api';
import {useAuthMutation} from '@/hooks';
import {formatPhone} from '@/helpers';
import {setUser} from '@/store/user';
import {IProfileData} from '@/types';

const ProfileTab = () => {
  const userData = useSelector(state => state)?.user;

  const [personalData, setPersonalData] = useState<IProfileData>({
    ...userData,
    imgUris: [],
  });

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [picImgOpen, setPicImgOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();
  const {themes, colorScheme} = useTheme();

  const {mutate: updatePic, isLoading: isUpdatePicLoading} = useAuthMutation({
    mutationFn: Api.profile.update,
    onSuccess: async res => {
      const user = {...userData, photo: profilePic};
      await SInfo.setItem('user', JSON.stringify(user), {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      });

      dispatch(setUser(user));
    },
    onError: ({errors}) => {
      console.log(errors);
    },
  });

  const setImage = newPic => {
    setProfilePic(newPic);
    updatePic(newPic);
  };

  useEffect(() => {
    setPersonalData(userData);
    setProfilePic(userData.photo);
  }, [userData]);

  return (
    <View style={[styles.container]}>
      <View style={[styles.topFigure, {top: -550 + insets.top}]}></View>
      <View style={[styles.profilePicContainer, {paddingTop: insets.top + 60}]}>
        <View style={{height: 138, width: 138, position: 'relative'}}>
          <Image
            source={!!profilePic?.url ? {uri: profilePic.url} : NoProfilePic}
            style={styles.profilePic}
            resizeMode="cover"
          />

          <View style={styles.hatIcon}>{<HatIcon />}</View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.editBtn}
            onPress={() => setPicImgOpen(true)}>
            <EditIcon />
          </TouchableOpacity>
        </View>

        <Text
          style={[styles.profilePicText, {color: themes[colorScheme].dark}]}>
          {personalData?.name}
        </Text>
      </View>
      <ScrollView style={{padding: 16}}>
        <Text style={[styles.itemTitle, {color: themes[colorScheme].dark}]}>
          Мої публікації
        </Text>

        <EditButton
          onPress={() => {
            navigation.navigate('ActivePublications');
          }}
          title="Активні"
        />

        <Text style={[styles.itemTitle, {color: themes[colorScheme].dark}]}>
          Мої дані
        </Text>

        <FilterItem title="Ім`я">
          <EditButton
            onPress={() => {
              navigation.navigate('ChangeName');
            }}
            title={personalData?.name}
          />
        </FilterItem>

        <FilterItem title="Локація">
          <EditButton
            title={personalData?.location?.name || 'Невідома локація'}
            onPress={() => {
              navigation.navigate('ChangeLocation');
            }}
          />
        </FilterItem>

        <FilterItem title="Телефон">
          <EditButton
            title={formatPhone(String(personalData?.phone))}
            onPress={() => {
              navigation.navigate('ChangePhone');
            }}
          />
        </FilterItem>

        <FilterItem title="E-mail">
          <EditButton
            title={personalData?.email}
            onPress={() => {
              navigation.navigate('ChangeEmail');
            }}
          />
        </FilterItem>

        <View style={{paddingVertical: 20}}>
          <Button
            type="bordered"
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
            Змінити пароль
          </Button>
          <Button type="secondary" onPress={() => setIsExitModalOpen(true)}>
            Вийти
          </Button>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: insets.bottom + 50,
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('About')}
            activeOpacity={0.7}>
            <Text style={styles.bottomButtonText}>Про додаток</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('PrivacyPolicy')}
            activeOpacity={0.7}>
            <Text style={styles.bottomButtonText}>Політика конфіндейності</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ExitDialog
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
      />
      <PicImageDialog
        visible={picImgOpen}
        onClose={() => setPicImgOpen(false)}
        setImage={setImage}
      />
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profilePic: {
    height: 138,
    width: 138,
    borderRadius: 69,
  },
  profilePicContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  profilePicText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 22,
    marginVertical: 20,
  },
  hatIcon: {
    position: 'absolute',
    top: -40,
  },
  topFigure: {
    position: 'absolute',
    left: -150,
    width: 700,
    height: 700,
    backgroundColor: '#FF879D',
    borderRadius: 350,
  },
  itemTitle: {
    marginVertical: 15,
    fontFamily: 'Raleway-SemiBold',
    fontSize: 22,
  },
  bottomButtonText: {
    color: '#757575',
    fontFamily: 'Raleway-Regular',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  editBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    height: 27,
    width: 27,
    borderRadius: 13.5,
  },
});
