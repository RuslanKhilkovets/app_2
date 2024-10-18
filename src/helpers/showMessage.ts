import Toast, {ToastType} from 'react-native-toast-message';

export const showMessage = (type: ToastType | undefined, text: string) => {
  Toast.show({
    swipeable: true,
    text1Style: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    text2Style: {
      fontWeight: 'bold',
      fontSize: 14,
    },
    type,
    text1: type === 'error' ? 'Сталася помилка' : 'Успіx!',
    text2: text,
  });
};

export default showMessage;
