import { useSelector } from "react-redux";
import { ServerAddress } from "../config";

export function useAuth() {
  const userData = useSelector((state) => state.auth.userData);

  return {
    isAuth: !!userData,
    userData: userData,
    userLogin: userData ? userData.login : null,
    userId: userData ? userData.id : null,
    userAvatar: userData ? `${ServerAddress}/avatars/${userData.profilePicture}` : null,
  };
}
