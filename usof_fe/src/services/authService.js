import axios from "axios";
import { ServerAddress } from "../config";

export default async function checkAuth() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    };

    const response = await axios.get(
      `${ServerAddress}/api/auth/refresh`,
      config
    );

    console.log(response);
    localStorage.setItem("token", response.data.accessToken);

    return response.data;
  } catch (e) {
    
    console.log(e.response);
    return null;
  }
}
