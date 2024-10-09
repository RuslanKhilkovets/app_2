import {FlatList, Platform, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  AppIcon,
  Button,
  CategoriesModal,
  Checkbox,
  DatePicker,
  EditButton,
  FilterItem,
  Input,
  KeyboardScroll,
  LocationModal,
  PhoneInput,
  PicImageDialog,
  Thumbnail,
} from '@/components';
import {IAddItemFormData, ICategory, ILocation} from '@/types';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';
import TABS from '@/constants/Tabs';
import {ITEM_STATUS} from '@/constants';
import {DateFormatter} from '@/helpers';

interface IItemFormProps {
  onFormClose: () => void;
  item: IAddItemFormData;
}

const EditForm = ({item, onFormClose}: IItemFormProps) => {
  const [formData, setFormData] = useState<IAddItemFormData>({
    ...item,
    action_at: new Date(DateFormatter.convertToIso8601(item.action_at)),
  });

  const [error, setError] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [picImgOpen, setPicImgOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [isArchieved, setIsArchieved] = useState(
    item?.status === ITEM_STATUS.ACTIVE,
  );

  const insets = useSafeAreaInsets();

  const {isLoading, mutate} = useAuthMutation({
    mutationFn: Api.myPosts.edit,
    onSuccess: res => {
      onFormClose();
    },
    onError: ({errors}) => {
      setError(errors?.message);
    },
  });

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const setActiveImage = (uri: string) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.map(image => ({
        ...image,
        is_main: image.uri === uri,
      })),
    }));
  };

  const {isLoading: isDeleteImageLoading, mutate: mutateDeleteImage} =
    useAuthMutation({
      mutationFn: Api.media.delete,
      onSuccess: res => {},
      onError: ({errors}) => {
        setError(errors?.message);
      },
    });

  const deleteVisualImage = (id: string) => {
    setFormData((prev: IAddItemFormData) => {
      return {
        ...prev,
        photos: prev.photos.filter(item => item.id !== id),
      };
    });
  };

  const onDeleteImage = (id: string) => {
    deleteVisualImage(id);
    mutateDeleteImage(id);
  };

  const {isLoading: isRestoreLoading, mutate: mutateRestore} = useAuthMutation({
    mutationFn: Api.myPosts.restore,
    onSuccess: res => {
      setIsArchieved(!isArchieved);
    },
    onError: ({errors}) => {
      setError(errors?.message);
    },
  });

  const onRestore = () => {
    mutateRestore(formData.id);
  };

  const {isLoading: isDeleteLoading, mutate: mutateDelete} = useAuthMutation({
    mutationFn: Api.myPosts.delete,
    onSuccess: res => {
      onFormClose();
    },
    onError: ({errors}) => {
      setError(errors?.message);
    },
  });

  const onDelete = () => {
    mutateDelete(formData.id);
  };

  const handleFormSubmit = () => {
    const payload = {
      type: formData.type,
      is_remuneration: +formData.is_remuneration,
      status: 'archived',
      name: formData.name,
      phone: formData.phone,
      body: formData.description,
      category_id: formData.category?.id,
      location_id: formData.location.id,
      photos: formData.photos,
    };
    mutate({postId: formData.id, payload});
  };

  const setImage = newImage => {
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, newImage],
    }));
  };

  useEffect(() => {
    setCategoryModalOpen(false);
  }, [formData.category]);

  useEffect(() => {
    setLocationModalOpen(false);
  }, [formData.location]);

  useEffect(() => {
    setDateOpen(false);
  }, [formData.action_at]);

  return (
    <View style={[{padding: 20, paddingBottom: insets.bottom + 60}]}>
      <KeyboardScroll>
        <View>
          <Input
            placeholder={
              formData?.type === TABS.I_FIND ? 'Що знайшли' : 'Що згубили'
            }
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
            style={{marginBottom: 20}}
          />
          <Input
            multiline
            numberOfLines={5}
            placeholder={
              formData?.type === TABS.I_FIND
                ? 'Де знайдено, опис знахідки'
                : 'Опис'
            }
            value={formData?.body}
            onChangeText={value => handleInputChange('description', value)}
          />

          <Button
            onPress={() => setPicImgOpen(true)}
            style={{marginTop: 20}}
            type="bordered"
            before={<AppIcon name="file" />}>
            Завантажити фото
          </Button>

          <PicImageDialog
            visible={picImgOpen}
            onClose={() => setPicImgOpen(false)}
            setImage={setImage}
          />

          <FlatList
            scrollEnabled={false}
            data={formData.photos}
            renderItem={({item}) => (
              <View style={{width: '25%', paddingHorizontal: 10}}>
                <Thumbnail
                  id={item.id}
                  uri={item.url}
                  active={item.is_main}
                  setActiveImage={setActiveImage}
                  onDelete={onDeleteImage}
                  style={{width: '100%', aspectRatio: 1}}
                />
              </View>
            )}
            keyExtractor={item => item.uri}
            numColumns={4}
            contentContainerStyle={{
              marginTop: 20,
              rowGap: 20,
            }}
            style={{marginLeft: -10, marginRight: -10}}
          />

          <FilterItem title="Категорія">
            <EditButton
              title={formData.category?.name || 'Вибрати категорію'}
              onPress={() => setCategoryModalOpen(true)}
            />
          </FilterItem>
          <FilterItem title="Локація">
            <EditButton
              title={formData.location?.name || 'Локація'}
              onPress={() => setLocationModalOpen(true)}
            />
          </FilterItem>
          <FilterItem
            title={
              formData?.type === TABS.I_FIND ? 'Дата знахідки' : 'Дата згуби'
            }>
            <DatePicker
              setOpen={() => setDateOpen(true)}
              date={formData.action_at}
              maxDate={new Date()}
              isOpen={dateOpen}
              onClose={() => setDateOpen(false)}
              onChange={date => handleInputChange('date', date)}
            />
          </FilterItem>
          <FilterItem title="Телефон для зв’язку">
            <PhoneInput
              placeholder="___ ___ __ __"
              value={formData?.phone}
              onChange={value => handleInputChange('phone', value)}
            />
          </FilterItem>

          <View style={{marginVertical: 20}}>
            <Checkbox
              label="За винагороду"
              value={true}
              onValueChange={() =>
                handleInputChange('forRemuneration', !formData.forRemuneration)
              }
              checked={formData.forRemuneration}
            />
          </View>
        </View>
        <View style={{gap: 14, marginBottom: Platform.OS === 'ios' ? 0 : 50}}>
          <Button onPress={handleFormSubmit}>Зберегти</Button>
          <Button
            type="bordered"
            onPress={onRestore}
            before={
              <AppIcon name={isArchieved ? 'activate' : 'archive'} size={15} />
            }>
            {isArchieved ? 'Активувати' : 'В архів'}
          </Button>
          <Button
            type="bordered"
            onPress={onDelete}
            before={<AppIcon name="delete" size={16} />}>
            Видалити
          </Button>
        </View>
      </KeyboardScroll>

      <CategoriesModal
        setCategory={(category: ICategory) =>
          handleInputChange('category', category)
        }
        openFrom="right"
        visible={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />

      <LocationModal
        setLocation={(location: ILocation) =>
          handleInputChange('location', location)
        }
        location={formData.location}
        openFrom="right"
        visible={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />
    </View>
  );
};

export default EditForm;
