import STATIC_DATE_TYPE from '@/constants/StaticDateType';
import ContentType from '@/constants/ContentType';
import ICategory from '@/types/ICategory';
import ILocation from '@/types/ILocation';

export default interface IFilters {
  q: string | null;
  type: ContentType;
  action_at_from: Date | null;
  action_at_to: Date | null;
  last?: STATIC_DATE_TYPE | null;
  category: ICategory | null;
  location: ILocation | null;
  withPhoto?: number | null;
  withBody?: number | null;
}
