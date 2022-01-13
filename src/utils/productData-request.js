import axios from "axios";
import { getCurrentUserToken } from "../firebase/firebase";

export async function getProduct(id) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `http://localhost:4000/products/${id}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function updateProduct(id, newData) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "PATCH",
    url: `http://localhost:4000/products/${id}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    data: {
      newData,
    },
  });
}

export async function deleteProduct(id) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "DELETE",
    url: `http://localhost:4000/products/${id}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
