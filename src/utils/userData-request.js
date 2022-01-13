import axios from "axios";
import { getCurrentUserToken } from "../firebase/firebase";

export async function getUserData(id) {
  const userToken = await getCurrentUserToken();

  return axios({
    method: "GET",
    url: `http://localhost:4000/users/${id}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getAllUsers() {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `http://localhost:4000/users`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function updateUser(id, newData) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "PATCH",
    url: `http://localhost:4000/users/${id}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    data: {
      newData,
    },
  });
}

export async function deleteUser(id) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "DELETE",
    url: `http://localhost:4000/users/${id}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
