import {ContentType} from '@/constants';
import ICategory from '@/types/ICategory';
import IImage from '@/types/IImage';
import ILocation from '@/types/ILocation';

export default interface IEditFormData {
  id: string;
  type?: ContentType;
  name: string;
  body: string;
  date?: Date | string;
  action_at?: null | Date;
  phone: string;
  is_remuneration: boolean;
  category: ICategory | null;
  location: ILocation | null;
  status?: string;
  photos: IImage[];
}
