import {IImage} from '@/types';

export default interface ICategory {
  id: string;
  name: string;
  image?: IImage | null;
}
