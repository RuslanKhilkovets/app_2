import {launchCamera} from 'react-native-image-picker';

export const takePhoto = (): Promise<FormData | null> => {
  return new Promise((resolve, reject) => {
    launchCamera({mediaType: 'photo', includeBase64: true}, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
        resolve(null);
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
        reject(new Error(response.errorMessage || 'Unknown error'));
      } else {
        const formData = new FormData();
        const image = {...response.assets?.[0]};

        formData.append('file', {
          ...image,
          name: image.fileName,
          size: image.fileSize,
        });

        resolve(formData);
      }
    });
  });
};

export default takePhoto;
