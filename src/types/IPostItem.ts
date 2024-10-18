import {ContentType, ITEM_STATUS} from '@/constants';
import IImage from '@/types/IImage';
import ILocation from '@/types/ILocation';
import IPhoto from '@/types/IPhoto';

export default interface IPostItem {
  id: string;
  name: string;
  location: ILocation;
  photos: IImage[];
  action_at?: Date | string;
  status: ITEM_STATUS;
  type: ContentType;
}
