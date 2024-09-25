import {ICategory, ILocation, IPicture} from '@/types';

export default interface IAddItemFormData {
  name: string;
  description: string;
  imgUris: IPicture[];
  date?: Date;
  phone: string;
  forRemuneration: boolean;
  category: ICategory | null;
  location: ILocation;
}
