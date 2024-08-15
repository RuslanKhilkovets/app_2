import ResetPasswordScreen from '@/screens/ResetPasswordScreen';
import EmailConfirmationScreen from '../screens/EmailConfirmationScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import SignFormsScreen from '../screens/SignFormsScreen';
import StartScreen from '../screens/StartScreen';
import StartSliderScreen from '../screens/StartSliderScreen';

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
];

export default routes;
