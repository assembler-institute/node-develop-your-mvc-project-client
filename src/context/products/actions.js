import axios from "axios";
import { actionTypes } from "./types";

export async function fetchProducts(dispatch) {
  try {
    const products = await axios.get("http://localhost:4000/products");
    dispatch({ type: actionTypes.FETCH_PRODUCTS, payload: products.data });
  } catch (err) {
    console.log(err);
  }
}
