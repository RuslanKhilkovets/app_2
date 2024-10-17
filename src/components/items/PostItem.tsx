import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {AppIcon, EditModal, ItemStatus} from '@/components';
import ActiveItem from '@images/item_active.png';
import InactiveItem from '@images/item_inactive.png';
import {IPostItem} from '@/types';
import {DateFormatter, showMessage} from '@/helpers';
import {ITEM_STATUS} from '@/constants';
import {IPhoto} from '@/types';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';
import {useNavigation} from '@react-navigation/native';

interface IPostItemProps {
  item: IPostItem;
  isOpen: boolean;
  onMenuToggle: () => void;
  resetMenu: () => void;
  setPosts: React.Dispatch<React.SetStateAction<IPostItem[]>>;
}

const PostItem = ({
  item,
  isOpen,
  onMenuToggle,
  resetMenu,
  setPosts,
}: IPostItemProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const mainPhoto = item.photos.find((photo: IPhoto) => photo.is_main);

  const {navigate} = useNavigation();

  const formattedDate =
    typeof item.action_at === 'string'
      ? item.action_at
      : DateFormatter.formatDateTime(item.action_at as Date);

  const {isLoading: isDeleteLoading, mutate: mutateDelete} = useAuthMutation({
    mutationFn: Api.myPosts.delete,
    onSuccess: res => {
      setPosts(prev => prev.filter(post => post.id !== item.id));
      showMessage('success', res.data.message);
    },
    onError: ({errors}) => {
      showMessage('error', errors.message);
    },
  });

  const {isLoading: isRestoreLoading, mutate: mutateRestore} = useAuthMutation({
    mutationFn: Api.myPosts.restore,
    onSuccess: res => {
      showMessage('success', res.data.message);
    },
    onError: ({errors}) => {
      showMessage('error', errors.message);
    },
  });

  const onDelete = () => {
    mutateDelete(item.id);
  };

  const onRestore = () => {
    mutateRestore(item.id);
  };

  const navToItemScreen = () => {
    navigate('Item', {id: item.id});
    resetMenu();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={navToItemScreen}>
        <View style={{flexDirection: 'row', gap: 15}}>
          <View
            style={[
              styles.imgContainer,
              item.status === ITEM_STATUS.INACTIVE
                ? styles.imgContainer_inactive
                : styles.imgContainer_active,
            ]}>
            {item.photos && mainPhoto ? (
              <Image source={{uri: mainPhoto.url}} style={styles.img} />
            ) : item.status === ITEM_STATUS.INACTIVE ? (
              <Image source={InactiveItem} style={styles.img} />
            ) : (
              <Image source={ActiveItem} style={styles.img} />
            )}
          </View>

          <View style={{gap: 6}}>
            <Text style={styles.title}>{item.name}</Text>

            <ItemStatus status={item.type} />

            <Text style={styles.bottomText}>
              {item?.location?.name || 'Не визначено'}
            </Text>

            <Text style={styles.bottomText}>{formattedDate}</Text>
          </View>
        </View>

        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity activeOpacity={0.7} onPress={onMenuToggle}>
            <AppIcon name="edit" size={27} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.menuContent}>
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => {
              setIsEditModalOpen(true);
              onMenuToggle();
            }}>
            <Text style={styles.menuBtnText}>Редагувати</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuBtn} onPress={onRestore}>
            <Text style={styles.menuBtnText}>В архів</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuBtn} onPress={onDelete}>
            <Text style={styles.menuBtnText}>Видалити</Text>
          </TouchableOpacity>
        </View>
      )}
      <EditModal
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        item={item}
        onItemDelete={() =>
          setPosts(prev => prev.filter(post => post.id !== item.id))
        }
      />
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
    overflow: 'hidden',
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
  menuContent: {
    position: 'absolute',
    right: 30,
    bottom: -30,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  menuBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  menuBtnText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    color: '#333',
  },
});
