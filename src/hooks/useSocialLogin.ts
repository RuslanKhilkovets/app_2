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
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      
      return tokens;
    } catch (e) {
      console.log('Google Sign-In error:', e);
    }
  };

  const googleMutation = useAuthMutation({
    mutationFn: googleSignIn,
    onError: err => console.log(err),
    onSuccess: ({accessToken}: {accessToken: string}) => {
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
    onSuccess: ({accessToken}: {accessToken: string}) => {
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
