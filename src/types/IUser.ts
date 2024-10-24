import {IImage} from '@/types';

export default interface IUser {
  id: string;
  name: string;
  email: string;
  phone: number;
  is_online: boolean;
  activity_at: Date;
  photo: IImage;
}
