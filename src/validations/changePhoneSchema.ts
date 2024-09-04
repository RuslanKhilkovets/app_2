import * as yup from 'yup';

  const changePhoneSchema = yup.object().shape({
    password: yup.string().required('Пароль є обов’язковим'),
    phone: yup.string().required('Телефон є обов’язковим'),
    code: yup
      .string()
      .length(4, 'Код повинен складатися з 4 цифр')
      .required('Код є обов’язковим'),
  });

  export default changePhoneSchema;