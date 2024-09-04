import * as yup from 'yup';

const changeEmailSchema = yup.object().shape({
  password: yup.string().required('Пароль є обов’язковим'),
  email: yup
    .string()
    .email('Невірний формат e-mail')
    .required('E-mail є обов’язковим'),
  code: yup
    .string()
    .length(4, 'Код повинен складатися з 4 цифр')
    .required('Код є обов’язковим'),
});

export default changeEmailSchema;
