import React, { useEffect, useState } from "react";
import withLayout from "../../hoc/withLayout";
import { useParams } from "react-router-dom";
import { getProduct } from "../../utils/productData-request";
import { StarIcon } from "@heroicons/react/solid";
import { useProducts } from "../../context/products/reducer";

function Product() {
  const { id } = useParams();
  const [productData, setProductData] = useState("");
  const { addProductShoppingCart } = useProducts();

  useEffect(async () => {
    (async function fetchData() {
      setProductData(await getProduct(id));
    })();
  }, []);

  if (productData.title) {
    return (
      <>
        <div className="bg-white">
          <div className="pt-6">
            {/* Image gallery */}
            <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
              <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                <img
                  src={productData.image[0]}
                  alt=""
                  className="w-full h-full object-center object-cover max-h-96"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                  <img
                    src={productData.image[0]}
                    alt=""
                    className="w-full h-full object-center object-cover max-h-44"
                  />
                </div>
                <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                  <img
                    src={productData.image[0]}
                    alt=""
                    className="w-full h-full object-center object-cover max-h-44"
                  />
                </div>
              </div>
              <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                <img
                  src={productData.image[0]}
                  alt=""
                  className="w-full h-full object-center object-cover max-h-96"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {productData.title}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:mt-0 lg:row-span-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">{productData.price} €</p>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <StarIcon
                          key={index}
                          className={"text-gray-900 h-5 w-5 flex-shrink-0"}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    {/*  <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a> */}
                  </div>
                </div>

                <button
                  data-id={productData._id}
                  onClick={() => addProductShoppingCart(productData._id)}
                  className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add to bag
                </button>
              </div>

              <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {productData.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    {productData.category}
                  </h3>

                  <div className="mt-4">
                    {/*  <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul> */}
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">Details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
}

export default withLayout(Product);
