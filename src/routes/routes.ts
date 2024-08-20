import {
  MainScreen,
  ResetPasswordScreen,
  EmailConfirmationScreen,
  PrivacyPolicyScreen,
  SignFormsScreen,
  StartScreen,
  StartSliderScreen,
  TabsNavigation,
} from '@/screens';

export const routes = [
  {
    name: 'StartSlider',
    component: StartSliderScreen,
    options: {headerShown: false},
  },
  {name: 'Start', component: StartScreen, options: {headerShown: false}},
  {
    name: 'SignForms',
    component: SignFormsScreen,
    options: {headerShown: false},
  },
  {
    name: 'PrivacyPolicy',
    component: PrivacyPolicyScreen,
    options: {headerShown: false},
  },
  {
    name: 'EmailConfirmation',
    component: EmailConfirmationScreen,
    options: {headerShown: false},
  },
  {
    name: 'ResetPassword',
    component: ResetPasswordScreen,
    options: {headerShown: false},
  },
  {
    name: 'Main',
    component: MainScreen,
    options: {headerShown: false},
  },
  {
    name: 'Tabs',
    component: TabsNavigation,
    options: {headerShown: false},
  },
];

export default routes;
