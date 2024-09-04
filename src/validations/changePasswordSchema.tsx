import * as yup from 'yup';

const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Старий пароль є обов’язковим'),
  newPassword: yup
    .string()
    .min(6, 'Пароль повинен мати щонайменше 6 символів')
    .required('Новий пароль є обов’язковим'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Паролі не співпадають')
    .required('Підтвердження паролю є обов’язковим'),
});

export default changePasswordSchema;
