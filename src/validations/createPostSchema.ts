import * as yup from 'yup';

import {PHONE_REGEX} from '@/constants/globals';

const createPostSchema = yup.object().shape({
  name: yup.string().required('Введіть назву предмета!'),
  description: yup.string().required('Опишіть знайдений предмет!'),
  date: yup.string().required('Додайте дату!'),
  phone: yup
    .string()
    .matches(PHONE_REGEX, 'Неправильний формат номера телефону')
    .required('Телефон є обов’язковим'),
});

export default createPostSchema;
