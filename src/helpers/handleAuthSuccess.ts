import { IUser } from "@/types";

interface IAuthSuccessResponse {
  data: {
    data: {
      access_token: string;
      user: IUser;
    };
  };
}

export const handleAuthSuccess = ({
  data: {
    data: {access_token, user},
  },
}: IAuthSuccessResponse) => {
  return {
    access_token,
    user,
  };
};

export default handleAuthSuccess;
