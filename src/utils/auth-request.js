import axios from "axios";
import { getCurrentUserToken, getCurrentUser } from "../firebase/firebase";

export async function syncUserData(firstName, lastName) {
  const userToken = await getCurrentUserToken();
  const user = await getCurrentUser();
  console.log(user);

  return axios({
    method: "POST",
    url: "http://localhost:4000/sign-up",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      firebaseId: user.uid,
    },
  });
}
