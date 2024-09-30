import TABS from '@/constants/Tabs';
import {ICategory, ILocation, IPicture} from '@/types';

export default interface IAddItemFormData {
  type?: TABS;
  name: string;
  description: string;
  imgUris: IPicture[];
  date?: Date;
  phone: string;
  forRemuneration: boolean;
  category: ICategory | null;
  location: ILocation;
}
