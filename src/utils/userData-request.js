import axios from "axios";
import { getCurrentUserToken } from "../firebase/firebase";

export default async function getUserData(id) {
  const userToken = await getCurrentUserToken();

  return axios({
    method: "GET",
    url: `http://localhost:4000/users/${id}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
