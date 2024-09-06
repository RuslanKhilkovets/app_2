import {launchImageLibrary} from 'react-native-image-picker';

export const selectImage = (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        resolve(null);
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        reject(new Error(response.errorMessage || 'Unknown error'));
      } else {
        const uri = response.assets?.[0].uri || null;
        resolve(uri);
      }
    });
  });
};

export default selectImage;
