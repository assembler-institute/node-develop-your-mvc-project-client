import axios from "axios";

export async function getProduct(id) {
  try {
    const res = await axios(`http://localhost:4000/products/${id}`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
}
