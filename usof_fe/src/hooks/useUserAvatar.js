import { useEffect } from "react";
import { getUserPicture } from "../services/profilePictureService";

const userAvatars = new Map();
const MAX_CACHE_SIZE = 10;

export function useUserAvatar(userId, isAuth) {
  useEffect(() => {
    if (userId != null && !userAvatars.has(userId)) {
      getUserPicture(userId).then((res) => {
        userAvatars.set(userId, res);

        if (userAvatars.size > MAX_CACHE_SIZE) {
          const firstKey = userAvatars.keys().next().value;
          userAvatars.delete(firstKey);
        }
      });
    }
  }, [userId, isAuth]);

  return {
    avatar: userAvatars.get(userId),
  };
}
