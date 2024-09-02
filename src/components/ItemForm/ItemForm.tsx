import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {createPostSchema} from '@/validations';
import {
  AppIcon,
  Button,
  CategoriesList,
  Checkbox,
  DatePicker,
  EditButton,
  FilterItem,
  Input,
  Modal,
  PhoneInput,
  PicImageDialog,
  SelectLocationList,
  Thumbnail,
} from '@/components';

type TFormType = 'i_find' | 'i_looking_for';

interface IItemForm {
  type: TFormType;
}

const ItemForm = ({type}: IItemForm) => {
  const [forRemuneration, setForRemuneration] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [picImgOpen, setPicImgOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState();
  const [imgUris, setImgUris] = useState([]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(createPostSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    setDateOpen(false);
  }, [date]);

  useEffect(() => {
    return () => {
      setDate(undefined);
      setImgUris([]);
      setForRemuneration(false);
    };
  }, []);

  return (
    <View style={styles.form}>
      <ScrollView>
        <Controller
          control={control}
          name="name"
          render={({field: {onChange, value}}) => (
            <Input
              placeholder={type === 'i_find' ? 'Що знайшли' : 'Що згубили'}
              value={value}
              onChangeText={onChange}
              error={errors.name?.message}
              style={{marginBottom: 20}}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({field: {onChange, value}}) => (
            <Input
              multiline
              numberOfLines={5}
              placeholder={
                type === 'i_find' ? 'Де знайдено, опис знахідки' : 'Опис'
              }
              value={value}
              onChangeText={onChange}
              error={errors.description?.message}
            />
          )}
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
          setUris={setImgUris}
        />

        <FlatList
          data={imgUris}
          renderItem={({item}) => (
            <Thumbnail active={item.active} uri={item.uri} />
          )}
          keyExtractor={item => item.uri}
          contentContainerStyle={{
            marginTop: 20,
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: 21,
          }}
        />

        <FilterItem title="Категорія">
          <EditButton
            title="Вибрати категорію"
            onPress={() => setCategoryModalOpen(true)}
          />
        </FilterItem>
        <FilterItem title="Локація">
          <EditButton
            title="Луцьк"
            onPress={() => setLocationModalOpen(true)}
          />
        </FilterItem>
        <FilterItem title={type === 'i_find' ? 'Дата знахідки' : 'Дата згуби'}>
          <DatePicker
            setOpen={() => setDateOpen(true)}
            date={date}
            maxDate={new Date()}
            isOpen={dateOpen}
            onClose={() => setDateOpen(false)}
            onChange={date => setDate(date)}
          />
        </FilterItem>
        <FilterItem title="Телефон для зв’язку">
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, value}}) => (
              <PhoneInput
                placeholder="___ ___ __ __"
                value={value}
                onChange={onChange}
                error={errors.description?.message}
              />
            )}
          />
        </FilterItem>

        <View style={{marginVertical: 20}}>
          <Checkbox
            label="За винагороду"
            value={true}
            onValueChange={() => setForRemuneration(!forRemuneration)}
            checked={forRemuneration}
          />
        </View>
      </ScrollView>

      <Button onPress={() => handleSubmit()}>Опублікувати</Button>

      <Modal
        openFrom="right"
        visible={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        title="Категорії">
        <CategoriesList />
      </Modal>
      <Modal
        openFrom="right"
        visible={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        title="Локація">
        <SelectLocationList style={{padding: 20}} />
      </Modal>
    </View>
  );
};

export default ItemForm;

const styles = StyleSheet.create({
  form: {
    padding: 20,
    paddingBottom: 60,
  },
});
