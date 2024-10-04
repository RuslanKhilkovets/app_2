import {ITEM_STATUS} from '@/constants';
import ILocation from '@/types/ILocation';
import IPhoto from '@/types/IPhoto';

export default interface IPostItem {
  id: string | null;
  name: string;
  location: ILocation;
  photos: IPhoto[];
  action_at?: Date | string;
  status: ITEM_STATUS;
}
