import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Неправильний формат електронної пошти')
    .required('E-mail є обов’язковим'),
  password: yup
    .string()
    .min(6, 'Пароль повинен бути принаймні 6 символів')
    .required('Пароль є обов’язковим'),
});

export default loginSchema;
