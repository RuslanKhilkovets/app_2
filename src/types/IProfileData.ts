import ILocation from '@/types/ILocation';

export default interface IProfileData {
  id: string;
  name: string;
  email: string;
  phone: number;
  created_at: Date;
  updated_at: Date;
  is_online: boolean;
  is_verified: boolean;
  location: ILocation;
  photo: null;
  added: null;
}
