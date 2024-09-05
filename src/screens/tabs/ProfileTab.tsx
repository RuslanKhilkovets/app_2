import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import HatIcon from '@icons/hat.svg';
import EditIcon from '@icons/edit.svg';
import NoProfilePic from '@images/no_profile_pic.png';
import {Button, EditButton, FilterItem, ExitDialog} from '@/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@/contexts/Theme/ThemeContext';

const ProfileTab = () => {
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();
  const {themes, colorScheme} = useTheme();

  return (
    <View style={[styles.container]}>
      <View style={[styles.topFigure, {top: -550 + insets.top}]}></View>
      <View style={[styles.profilePicContainer, {paddingTop: insets.top + 60}]}>
        <View style={{height: 138, width: 138, position: 'relative'}}>
          <Image source={NoProfilePic} />

          <View style={styles.hatIcon}>{<HatIcon />}</View>

          <TouchableOpacity activeOpacity={0.7} style={styles.editBtn}>
            <EditIcon />
          </TouchableOpacity>
        </View>

        <Text
          style={[styles.profilePicText, {color: themes[colorScheme].dark}]}>
          Діана
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
            title="Діана"
          />
        </FilterItem>

        <FilterItem title="Локація">
          <EditButton
            title="Луцьк"
            onPress={() => {
              navigation.navigate('ChangeLocation');
            }}
          />
        </FilterItem>

        <FilterItem title="Телефон">
          <EditButton
            title="095 888 77 66"
            onPress={() => {
              navigation.navigate('ChangePhone');
            }}
          />
        </FilterItem>

        <FilterItem title="E-mail">
          <EditButton
            title="mymail@gmail.com"
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
            paddingBottom: insets.bottom + 30,
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
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
