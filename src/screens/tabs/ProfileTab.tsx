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

import NoProfilePic from '../../../assets/images/no_profile_pic.png';
import {Button, EditButton, FilterItem, ExitDialog} from '@/components';

const ProfileTab = () => {
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topFigure}></View>
      <View style={styles.profilePicContainer}>
        <View style={{height: 138, width: 138, position: 'relative'}}>
          <Image source={NoProfilePic} />

          <View style={styles.hatIcon}>{HatIcon()}</View>
        </View>

        <Text style={styles.profilePicText}>Діана</Text>
      </View>
      <View style={{padding: 16}}>
        <Text style={styles.itemTitle}>Мої публікації</Text>

        <EditButton
          onPress={() => {
            navigation.navigate('ChangePersonalData', {
              screenType: 'posts',
            });
          }}
          title="Активні"
        />

        <Text style={styles.itemTitle}>Мої дані</Text>

        <FilterItem title="Ім`я">
          <EditButton
            onPress={() => {
              navigation.navigate('ChangePersonalData', {screenType: 'name'});
            }}
            title="Діана"
          />
        </FilterItem>

        <FilterItem title="Локація">
          <EditButton
            title="Луцьк"
            onPress={() => {
              navigation.navigate('ChangePersonalData', {
                screenType: 'location',
              });
            }}
          />
        </FilterItem>

        <FilterItem title="Телефон">
          <EditButton
            onPress={() => {}}
            title="095 888 77 66"
            onPress={() => {
              navigation.navigate('ChangePersonalData', {
                screenType: 'phone',
              });
            }}
          />
        </FilterItem>

        <FilterItem title="E-mail">
          <EditButton
            onPress={() => {}}
            title="mymail@gmail.com"
            onPress={() => {
              navigation.navigate('ChangePersonalData', {
                screenType: 'email',
              });
            }}
          />
        </FilterItem>

        <View style={{paddingVertical: 20}}>
          <Button
            type="bordered"
            onPress={() => {
              navigation.navigate('ChangePersonalData', {
                screenType: 'password',
              });
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
      </View>
      <ExitDialog
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
      />
    </ScrollView>
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
    paddingTop: 100,
  },
  profilePicText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 22,
    marginTop: 20,
  },
  hatIcon: {
    position: 'absolute',
    top: -40,
  },
  topFigure: {
    position: 'absolute',
    top: -500,
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
});
