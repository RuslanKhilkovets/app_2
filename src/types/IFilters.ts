import STATIC_DATE_TYPE from '@/constants/StaticDateType';
import TABS from '@/constants/Tabs';
import ICategory from '@/types/ICategory';
import ILocation from '@/types/ILocation';

export default interface IFilters {
  q: string | null;
  type: TABS;
  action_at_from: Date | null;
  action_at_to: Date | null;
  last?: STATIC_DATE_TYPE | null;
  category: ICategory | null;
  location: ILocation | null;
  withPhoto?: 1 | 0;
  withBody?: 1 | 0;
}
