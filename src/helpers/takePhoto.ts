import {launchCamera} from 'react-native-image-picker';

export const takePhoto = (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
        resolve(null);
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
        reject(new Error(response.errorMessage || 'Unknown error'));
      } else {
        const uri = response.assets?.[0].uri || null;
        resolve(uri);
      }
    });
  });
};

export default takePhoto;
