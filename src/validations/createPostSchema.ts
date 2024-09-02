import * as yup from 'yup';
import {PHONE_REGEX} from '@/constants/globals';

const createPostSchema = yup.object().shape({
  name: yup.string().required('Введіть назву предмета!'),
  description: yup.string().required('Опишіть знайдений предмет!'),
  imgUris: yup
    .array()
    .of(
      yup.object().shape({
        uri: yup.string(),
        active: yup.boolean(),
      }),
    )
    .min(1, 'Додайте хоча б одне зображення!'),
  date: yup.string().required('Додайте дату!'),
  phone: yup
    .string()
    .matches(PHONE_REGEX, 'Неправильний формат номера телефону')
    .required('Телефон є обов’язковим'),
  forRemuneration: yup.boolean().required('Виберіть, чи за винагороду!'),
  category: yup.string().required('Виберіть категорію!'),
  location: yup.string().required('Виберіть локацію!'),
});

export default createPostSchema;
