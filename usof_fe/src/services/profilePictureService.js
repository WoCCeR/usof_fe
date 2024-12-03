import { getUsertById } from "../api/user";
import { ServerAddress } from "../config";

export async function getUserPicture(userId) {
  const response = await getUsertById(userId);

  return `${ServerAddress}/avatars/${response.data.profilePicture}`;
}
