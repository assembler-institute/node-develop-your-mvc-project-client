import React, { useEffect } from "react";
import { useProducts } from "../../context/products";
import Product from "../Product/Product";

function ProductListing() {
  const { products, fetchAllProducts } = useProducts();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {products.data
            ? products.data.map((product, index) => (
                <div
                  className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                  key={index}
                >
                  <Product
                    id={product._id}
                    title={product.title}
                    price={product.price}
                    category={product.category}
                    image={product.image[0]}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default ProductListing;
