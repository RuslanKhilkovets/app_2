import * as yup from 'yup';

const changePasswordSchema = yup.object().shape({
  current_password: yup.string().required('Старий пароль є обов’язковим'),
  password: yup
    .string()
    .min(6, 'Пароль повинен мати щонайменше 6 символів')
    .required('Новий пароль є обов’язковим'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Паролі не співпадають')
    .required('Підтвердження паролю є обов’язковим'),
});

export default changePasswordSchema;
