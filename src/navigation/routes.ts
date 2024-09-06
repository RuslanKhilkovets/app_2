import {
  MainScreen,
  ResetPasswordScreen,
  EmailConfirmationScreen,
  PrivacyPolicyScreen,
  SignFormsScreen,
  StartScreen,
  StartSliderScreen,
  About,
  ItemScreen,
  ActivePublicationsScreen,
  ChangeNameScreen,
  ChangeLocationScreen,
  ChangePhoneScreen,
  ChangeEmailScreen,
  ChangePasswordScreen,
  ChatScreen,
} from '@/screens';
import {TabsNavigation} from '@/navigation';

interface IRoutes {
  name: string;
  component: React.ComponentType;
}

export const routes: IRoutes[] = [
  {
    name: 'StartSlider',
    component: StartSliderScreen,
  },
  {
    name: 'Chat',
    component: ChatScreen,
  },
  {
    name: 'ActivePublications',
    component: ActivePublicationsScreen,
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
  {name: 'Start', component: StartScreen},
  {
    name: 'SignForms',
    component: SignFormsScreen,
  },
  {
    name: 'PrivacyPolicy',
    component: PrivacyPolicyScreen,
  },
  {
    name: 'EmailConfirmation',
    component: EmailConfirmationScreen,
  },
  {
    name: 'ResetPassword',
    component: ResetPasswordScreen,
  },
  {
    name: 'About',
    component: About,
  },
  {
    name: 'Main',
    component: MainScreen,
  },
  {
    name: 'Tabs',
    component: TabsNavigation,
  },
];

export default routes;
