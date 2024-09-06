import {IImage} from '@/types';

export default interface IAddItemFormData {
  name: string;
  description: string;
  imgUris: IImage[];
  date: string | Date;
  phone: string;
  forRemuneration: boolean;
  category: string;
  location: string;
}
