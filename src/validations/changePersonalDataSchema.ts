import * as yup from 'yup';

export default function getSchemeByScreenType(screenType: string) {
  const validationSchema = yup.object().shape({
    ...(screenType === 'name' && {
      name: yup.string().required('Ім`я є обов’язковим'),
    }),
    ...(screenType === 'phone' && {
      password: yup.string().required('Пароль є обов’язковим'),
      newPhone: yup.string().required('Телефон є обов’язковим'),
      codePhone: yup
        .string()
        .length(4, 'Код повинен складатися з 4 цифр')
        .required('Код є обов’язковим'),
    }),
    ...(screenType === 'email' && {
      password: yup.string().required('Пароль є обов’язковим'),
      newEmail: yup
        .string()
        .email('Невірний формат e-mail')
        .required('E-mail є обов’язковим'),
      codeEmail: yup
        .string()
        .length(4, 'Код повинен складатися з 4 цифр')
        .required('Код є обов’язковим'),
    }),
    ...(screenType === 'password' && {
      oldPassword: yup.string().required('Старий пароль є обов’язковим'),
      newPassword: yup
        .string()
        .min(6, 'Пароль повинен мати щонайменше 6 символів')
        .required('Новий пароль є обов’язковим'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Паролі не співпадають')
        .required('Підтвердження паролю є обов’язковим'),
    }),
  });
  return validationSchema;
}
