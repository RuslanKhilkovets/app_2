import TABS from '@/constants/Tabs';

export default interface IItem {
  id: string | number;
  name: string;
  body: string;
  is_remuneration: 1 | 0;
  is_favorite: boolean;
  phone?: string | null;
  type: TABS;
  status: string;
  published_at: Date;
  action_at?: Date | null;
  location: {
    id: string;
    name: string;
    type: string;
  };
  category: {
    id: string;
    name: string;
  };
  photos: {
    id: string;
    mime_type: string;
    extension: string;
    name: string;
    is_main: boolean;
    size: number;
    url: string;
    delete: boolean;
  }[];
}
