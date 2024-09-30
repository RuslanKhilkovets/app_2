import {launchImageLibrary} from 'react-native-image-picker';

export const selectImage = (): Promise<FormData | null> => {
  return new Promise((resolve, reject) => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        resolve(null);
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
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

export default selectImage;
