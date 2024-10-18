import ContentType from '@/constants/ContentType';
import {ICategory, ILocation, IPicture} from '@/types';

export default interface IAddItemFormData {
  type?: ContentType;
  name: string;
  description: string;
  imgUris: IPicture[];
  date?: Date | string;
  action_at?: string | null | Date;
  phone: string;
  forRemuneration: boolean;
  category: ICategory | null;
  location: ILocation | null;
  status?: string;
}
