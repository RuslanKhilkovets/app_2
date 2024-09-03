import {
  MainScreen,
  ResetPasswordScreen,
  EmailConfirmationScreen,
  PrivacyPolicyScreen,
  SignFormsScreen,
  StartScreen,
  StartSliderScreen,
  ChangePersonDataScreen,
  About,
  ItemScreen,
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
    name: 'ChangePersonalData',
    component: ChangePersonDataScreen,
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
