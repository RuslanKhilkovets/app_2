import TabsNavigation from '@/navigation/TabsNavigation';
import {
  ResetPasswordScreen,
  EmailConfirmationScreen,
  PrivacyPolicyScreen,
  SignFormsScreen,
  StartScreen,
  StartSliderScreen,
  MainScreen,
} from '@/screens';
import {IRoute} from '@/types';

export const publicRoutes: IRoute[] = [
  {name: 'Start', component: StartScreen},
  {
    name: 'StartSlider',
    component: StartSliderScreen,
  },
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
    name: 'Tabs',
    component: TabsNavigation,
  },
  {
    name: 'Main',
    component: MainScreen,
  },
];

export default publicRoutes;
