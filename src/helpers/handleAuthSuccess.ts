export const handleAuthSuccess = ({
  data: {
    data: {access_token, user},
  },
}) => {
  return {
    access_token,
    user,
  };
};

export default handleAuthSuccess;
