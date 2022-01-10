import React, { useEffect, useState } from "react";
import withLayout from "../../hoc/withLayout";
import { useParams } from "react-router-dom";
import { getProduct } from "../../utils/productData-request";

function Product() {
  const { id } = useParams();
  const [productData, setProductData] = useState("");
  useEffect(async () => {
    (async function fetchData() {
      setProductData(await getProduct(id));
    })();
  }, []);
  if (productData.title) {
    return (
      <>
        <h1>{productData.title}</h1>
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {productData.image.map((img, index) => (
            <div
              className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
              key={index}
            >
              <img alt={productData.title} src={img} />
            </div>
          ))}
        </div>
        <ul>
          <li>
            <b>Description:</b>
          </li>
          <p>{productData.description}</p>
          <li>
            <b>Price:</b> {productData.price}
          </li>
          <li>
            <b>Category:</b> {productData.category}
          </li>
          <li>
            <b>Units in stock:</b> {productData.unitsInStock}
          </li>
        </ul>
      </>
    );
  }
  return null;
}

export default withLayout(Product);
