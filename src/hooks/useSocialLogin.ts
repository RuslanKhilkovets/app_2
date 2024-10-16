import {useContext} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {AuthContext} from '@/contexts/Auth/AuthContext';
import useAuthMutation from '@/hooks/useAuthMutation';
import {handleAuthSuccess} from '@/helpers';
import {Api} from '@/api';

export const useSocialSignIn = () => {
  const {login} = useContext(AuthContext);

  const socialMutation = useAuthMutation({
    mutationFn: Api.auth.socialLogin,
    onError: err => console.log(err),
    onSuccess: res => {
      const {access_token, user} = handleAuthSuccess(res);
      login(access_token, user);
    },
  });

  const googleSignIn = async () => {
    try {
      // Check if Google Play services are available
      await GoogleSignin.hasPlayServices();

      // Sign in the user
      await GoogleSignin.signIn();

      // Get the tokens, ensuring you await it
      const tokens = await GoogleSignin.getTokens(); // Add await here

      console.log('tokens', tokens); // This should log the tokens object

      // Return the tokens object
      return tokens;
    } catch (e) {
      console.log('Google Sign-In error:', e);
    }
  };

  const googleMutation = useAuthMutation({
    mutationFn: googleSignIn,
    onError: err => console.log(err),
    onSuccess: ({accessToken}) => {
      socialMutation.mutate({
        provider: 'google',
        payload: {
          token: accessToken,
        },
      });
    },
  });

  const facebookSignIn = async () => {
    // await LoginManager.logInWithPermissions(['public_profile']);
    // return AccessToken.getCurrentAccessToken();
  };

  const facebookMutation = useAuthMutation({
    mutationFn: facebookSignIn,
    onError: err => console.log(err),
    onSuccess: ({accessToken}) => {
      socialMutation.mutate({
        provider: 'facebook',
        payload: {
          token: accessToken,
        },
      });
    },
  });

  return {socialMutation, googleMutation, facebookMutation};
};

export default useSocialSignIn;
