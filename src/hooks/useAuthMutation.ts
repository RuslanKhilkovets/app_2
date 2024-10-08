import {useContext} from 'react';
import {useMutation} from '@tanstack/react-query';

import {AuthContext} from '@/contexts/Auth/AuthContext';
import {showMessage} from '@/helpers';

export const useAuthMutation = options => {
  const {logout} = useContext(AuthContext);
  const mutation = useMutation(options);

  if (mutation?.error?.status === 401 || mutation?.error?.status === 403) {
    showMessage('error', mutation?.error?.message);
    return logout();
  }

  return {
    ...mutation,
    isLoading: mutation.isPending,
  };
};

export default useAuthMutation;
