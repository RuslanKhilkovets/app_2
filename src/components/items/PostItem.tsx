import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';

import {AppIcon} from '@/components';
import ActiveItem from '@images/item_active.png';
import InactiveItem from '@images/item_inactive.png';

interface IPostItemProps {
  id: number;
  img: string;
  title: string;
  status: 1 | 0;
  city: string;
  date: string;
}

const PostItem = ({id, img, title, status, city, date}: IPostItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const statusText = status === 1 ? 'Знайдено' : 'В пошуку';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} activeOpacity={0.7}>
        <View style={{flexDirection: 'row', gap: 15}}>
          <View
            style={[
              styles.imgContainer,
              status === 0
                ? styles.imgContainer_inactive
                : styles.imgContainer_active,
            ]}>
            {img ? (
              <Image source={{uri: img}} style={styles.img} />
            ) : !img && status === 0 ? (
              <Image source={InactiveItem} style={styles.img} />
            ) : (
              <Image source={ActiveItem} style={styles.img} />
            )}
          </View>

          <View style={{gap: 6}}>
            <Text style={styles.title}>{title}</Text>

            <Text
              style={[
                styles.status,
                status === 0 ? styles.inactive : styles.active,
              ]}>
              {statusText}
            </Text>

            <Text style={styles.bottomText}>{city}</Text>

            <Text style={styles.bottomText}>{date}</Text>
          </View>
        </View>

        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity activeOpacity={0.7} onPress={toggleMenu}>
            <AppIcon name="edit" size={27} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {isMenuOpen && (
        <Pressable style={styles.menuOverlay} onPress={closeMenu}>
          <View style={styles.menuContent}>
            <TouchableOpacity style={styles.menuBtn} onPress={() => {}}>
              <Text style={styles.menuBtnText}>Редагувати</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuBtn} onPress={() => {}}>
              <Text style={styles.menuBtnText}>В архів</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuBtn} onPress={() => {}}>
              <Text style={styles.menuBtnText}>Видалити</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}
    </>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    height: 100,
    width: 100,
  },
  imgContainer: {
    borderRadius: 5,
  },
  imgContainer_active: {
    backgroundColor: '#fdeae9',
  },
  imgContainer_inactive: {
    backgroundColor: '#ede6ff',
  },
  title: {
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
    color: '#000',
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Raleway-Medium',
    fontSize: 13,
  },
  active: {
    borderColor: '#ff4a4a',
    color: '#ff4a4a',
  },
  inactive: {
    borderColor: '#9847FF',
    color: '#9847FF',
  },
  bottomText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#757575',
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuContent: {
    position: 'absolute',
    right: 20,
    bottom: -20,
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 18,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  menuBtn: {
    alignItems: 'center',
  },
  menuBtnText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    color: '#333',
  },
});
