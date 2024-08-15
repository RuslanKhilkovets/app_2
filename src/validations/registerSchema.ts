import {PHONE_REGEX} from 'constants/globals';
import * as yup from 'yup';

const registerSchema = yup.object().shape({
  name: yup.string().required('Ім’я є обов’язковим'),
  email: yup
    .string()
    .email('Неправильний формат електронної пошти')
    .required('E-mail є обов’язковим'),
  phone: yup
    .string()
    .matches(PHONE_REGEX, 'Неправильний формат номера телефону')
    .required('Телефон є обов’язковим'),
  password: yup
    .string()
    .min(6, 'Пароль повинен бути принаймні 6 символів')
    .required('Пароль є обов’язковим'),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Паролі повинні співпадати')
    .required('Підтвердження паролю є обов’язковим'),
});

export default registerSchema;
