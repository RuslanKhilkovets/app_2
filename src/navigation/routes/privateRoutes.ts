import {
  MainScreen,
  PrivacyPolicyScreen,
  About,
  ItemScreen,
  ActivePublicationsScreen,
  ChangeNameScreen,
  ChangeLocationScreen,
  ChangePhoneScreen,
  ChangeEmailScreen,
  ChangePasswordScreen,
  ChatScreen,
  SignFormsScreen,
} from '@/screens';
import {TabsNavigation} from '@/navigation';
import {IRoute} from '@/types';

export const privateRoutes: IRoute[] = [
  {
    name: 'Main',
    component: MainScreen,
  },
  {
    name: 'Tabs',
    component: TabsNavigation,
  },
  {
    name: 'ActivePublications',
    component: ActivePublicationsScreen,
  },
  {
    name: 'Chat',
    component: ChatScreen,
  },
  {
    name: 'SignForms',
    component: SignFormsScreen,
  },
  {
    name: 'ChangeName',
    component: ChangeNameScreen,
  },
  {
    name: 'ChangePassword',
    component: ChangePasswordScreen,
  },
  {
    name: 'ChangeLocation',
    component: ChangeLocationScreen,
  },
  {
    name: 'ChangePhone',
    component: ChangePhoneScreen,
  },
  {
    name: 'ChangeEmail',
    component: ChangeEmailScreen,
  },
  {
    name: 'Item',
    component: ItemScreen,
  },

  {
    name: 'PrivacyPolicy',
    component: PrivacyPolicyScreen,
  },
  {
    name: 'About',
    component: About,
  },
];

export default privateRoutes;
