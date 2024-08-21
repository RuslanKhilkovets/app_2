import {
  MainScreen,
  ResetPasswordScreen,
  EmailConfirmationScreen,
  PrivacyPolicyScreen,
  SignFormsScreen,
  StartScreen,
  StartSliderScreen,
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
    name: 'Main',
    component: MainScreen,
  },
  {
    name: 'Tabs',
    component: TabsNavigation,
  },
];

export default routes;
