import {FlatList, View} from 'react-native';
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
import {DateFormatter} from '@/helpers';
import {useSelector} from 'react-redux';

interface IItemFormProps {
  onFormClose: () => void;
  type: TABS;
}

const AddItemForm = ({type, onFormClose}: IItemFormProps) => {
  const [formData, setFormData] = useState<IAddItemFormData>({
    name: '',
    description: '',
    imgUris: [],
    forRemuneration: false,
    phone: '',
    category: null,
    location: {name: 'Невідомо'},
  });
  const [error, setError] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [picImgOpen, setPicImgOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const insets = useSafeAreaInsets();

  const {user_id} = useSelector(state => state)?.user;

  const {isLoading, mutate} = useAuthMutation({
    mutationFn: Api.myPosts.add,
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
      imgUris: prev.imgUris.map(image => ({
        ...image,
        active: image.uri === uri,
      })),
    }));
  };

  const onDeleteImage = (uri: string) => {
    setFormData((prev: IAddItemFormData) => {
      return {
        ...prev,
        imgUris: prev.imgUris.filter(item => item.uri !== uri),
      };
    });
  };

  const handleFormSubmit = () => {
    const data = {
      type,
      is_remuneration: +formData.forRemuneration,
      status: 'archived',
      name: formData.name,
      phone: formData.phone,
      body: formData.description,
      action_at: DateFormatter.formatDateTime(formData.date),
      category_id: formData.category?.id,
      location_id: formData.location.id,
      user_id,
      photos: [], // TODO: add photos (formData.imgUris)
    };
    mutate(data);
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
    <View style={[{padding: 20, paddingBottom: insets.bottom + 60}]}>
      <KeyboardScroll>
        <View>
          <Input
            placeholder={type === TABS.I_FIND ? 'Що знайшли' : 'Що згубили'}
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
            style={{marginBottom: 20}}
          />
          <Input
            multiline
            numberOfLines={5}
            placeholder={
              type === TABS.I_FIND ? 'Де знайдено, опис знахідки' : 'Опис'
            }
            value={formData.description}
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
            setUris={setFormData}
          />

          <FlatList
            scrollEnabled={false}
            data={formData.imgUris}
            renderItem={({item}) => (
              <View style={{width: '25%', paddingHorizontal: 10}}>
                <Thumbnail
                  uri={item.uri}
                  active={item.active}
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
              title={formData.location.name || 'Локація'}
              onPress={() => setLocationModalOpen(true)}
            />
          </FilterItem>
          <FilterItem
            title={type === TABS.I_FIND ? 'Дата знахідки' : 'Дата згуби'}>
            <DatePicker
              setOpen={() => setDateOpen(true)}
              date={formData.date}
              maxDate={new Date()}
              isOpen={dateOpen}
              onClose={() => setDateOpen(false)}
              onChange={date => handleInputChange('date', date)}
            />
          </FilterItem>
          <FilterItem title="Телефон для зв’язку">
            <PhoneInput
              placeholder="___ ___ __ __"
              value={formData.phone}
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

export default AddItemForm;
