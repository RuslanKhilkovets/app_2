import {FlatList, StyleSheet, Text, View} from 'react-native';
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
import {useAuthMutation, useTypedSelector} from '@/hooks';
import {Api} from '@/api';
import ContentType from '@/constants/ContentType';
import {DateFormatter, showMessage} from '@/helpers';

interface IItemFormProps {
  onFormClose: () => void;
  type: ContentType;
}

const AddItemForm = ({type, onFormClose}: IItemFormProps) => {
  const [formData, setFormData] = useState<IAddItemFormData>({
    name: '',
    description: '',
    imgUris: [],
    forRemuneration: false,
    phone: '',
    category: null,
    location: null as import('@/types').ILocation | null,
    date: '',
  });
  const [error, setError] = useState({
    name: '',
    body: '',
    category: '',
    location: '',
    phone: '',
    date: '',
  });
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [picImgOpen, setPicImgOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const insets = useSafeAreaInsets();

  const {user_id} = useTypedSelector(state => state.user) || {};

  const {isLoading, mutate} = useAuthMutation({
    mutationFn: Api.myPosts.add,
    onSuccess: res => {
      onFormClose();
      showMessage(
        'success',
        `${
          type === ContentType.I_FIND ? 'Знахідку ' : 'Згубу '
        } успішно додано!`,
      );
    },
    onError: ({errors}) => {
      setError(prev => ({...prev, errors}));
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
      imgUris: prev.imgUris.map(image => ({
        ...image,
        is_main: image.uri === uri,
      })),
    }));
  };

  const {isLoading: isDeleteLoading, mutate: mutateDelete} = useAuthMutation({
    mutationFn: Api.media.delete,
  });

  const deleteVisualImage = (id: string) => {
    setFormData((prev: IAddItemFormData) => {
      return {
        ...prev,
        imgUris: prev.imgUris.filter(item => item.id !== id),
      };
    });
  };

  const onDeleteImage = (id: string) => {
    deleteVisualImage(id);
    mutateDelete(id);
  };

  const handleFormSubmit = () => {
    const errors: Record<string, string> = {};

    if (!formData.name) {
      errors.name = 'Введіть назву';
    }
    if (!formData.description) {
      errors.body = 'Введіть опис';
    }
    if (!formData.category?.id) {
      errors.category = 'Виберіть категорію';
    }
    if (!formData.location?.id) {
      errors.location = 'Виберіть локацію';
    }
    console.log(formData.phone.length);

    if (formData.phone.length < 18) {
      errors.phone = 'Занадто короткий номер телефону';
    }
    if (!formData.date) {
      errors.date = `Вкажіть дату ${
        type === ContentType.I_FIND ? 'знахідки' : 'згуби'
      } `;
    }

    if (Object.keys(errors).length > 0) {
      setError(prev => ({...prev, ...errors}));
      return;
    }

    const data = {
      type,
      is_remuneration: +formData.forRemuneration,
      status: 'archived',
      name: formData.name,
      phone: formData.phone,
      body: formData.description,
      action_at: DateFormatter.formatDateTime(formData.date),
      category_id: formData.category?.id,
      location_id: formData?.location?.id || null,
      user_id,
      photos: formData.imgUris,
    };

    mutate(data);
  };
  console.log(error.date);

  const setImage = newImage => {
    setFormData(prev => ({
      ...prev,
      imgUris: [
        ...prev.imgUris,
        {...newImage, is_main: prev.imgUris.length === 0},
      ],
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
  }, [formData.date]);

  return (
    <View style={[{margin: 20, paddingBottom: insets.bottom + 60}]}>
      <KeyboardScroll>
        <View>
          <Input
            placeholder={
              type === ContentType.I_FIND ? 'Що знайшли' : 'Що згубили'
            }
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
            style={{marginBottom: 20}}
            error={!formData.name && error.name}
          />
          <Input
            multiline
            numberOfLines={5}
            placeholder={
              type === ContentType.I_FIND
                ? 'Де знайдено, опис знахідки'
                : 'Опис'
            }
            value={formData.description}
            onChangeText={value => handleInputChange('description', value)}
            error={!formData.description && error.body}
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
            data={formData.imgUris}
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
              error={!formData.category?.id && error.category}
            />
          </FilterItem>
          <FilterItem title="Локація">
            <EditButton
              title={formData.location?.name || 'Локація'}
              onPress={() => setLocationModalOpen(true)}
              error={!formData.location?.id && error.location}
            />
          </FilterItem>
          <FilterItem
            title={
              type === ContentType.I_FIND ? 'Дата знахідки' : 'Дата згуби'
            }>
            <DatePicker
              setOpen={() => setDateOpen(true)}
              date={formData.date}
              maxDate={new Date()}
              isOpen={dateOpen}
              onClose={() => setDateOpen(false)}
              onChange={date => handleInputChange('date', date)}
              error={error.date}
            />
            {!!error.date && !formData.date && (
              <Text style={[styles.errorText]}>{error.date}</Text>
            )}
          </FilterItem>
          <FilterItem title="Телефон для зв’язку">
            <PhoneInput
              placeholder="___ ___ __ __"
              value={formData.phone}
              onChange={value => handleInputChange('phone', value)}
              error={error.phone}
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

        <Button onPress={handleFormSubmit}>Опублікувати</Button>
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
        setLocation={(location: ILocation | null) =>
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

export default AddItemForm;

const styles = StyleSheet.create({
  errorText: {
    color: '#ff0000',
    marginVertical: 5,
  },
});
