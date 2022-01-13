import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PaperClipIcon, PencilAltIcon } from "@heroicons/react/solid";

import withDashboardLayout from "../../hoc/withDashboardLayout/withDashboardLayout";
import {
  checkSession,
  getCurrentUser,
} from "../../context/authContext/localStorage";
import { getProduct, updateProduct } from "../../utils/productData-request";
import { useAuth } from "../../context/authContext/reducer";

function DashboardSingleProduct() {
  const { productId } = useParams();
  const isLogged = checkSession();
  const [productData, setProductData] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  // const [image, setImage] = useState("");
  const [unitsInStock, setUnitsInStock] = useState("");
  const [description, setDescription] = useState("");

  const { signInSuccess } = useAuth();

  useEffect(() => {
    if (isLogged) {
      const currentUser = getCurrentUser();
      signInSuccess(currentUser);
    }
    (async function fetchData() {
      const { data } = await getProduct(productId);
      setProductData(data.data);
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newData = {
        title: title !== "" ? title : productData.title,
        category: category !== "" ? category : productData.category,
        description: description !== "" ? description : productData.description,
        price: price !== "" ? price : productData.price,
        unitsInStock:
          unitsInStock !== "" ? unitsInStock : productData.unitsInStock,
      };
      updateProduct(productData._id, newData);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      {productData ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Product Information
            </h3>
          </div>
          <form action="#" method="POST" onSubmit={handleSubmit}>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      id="title"
                      name="title"
                      type="title"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      defaultValue={productData.title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Category
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      id="category"
                      name="category"
                      type="category"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      defaultValue={productData.category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Units In Stock
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      id="unitsInStock"
                      name="unitsInStock"
                      type="unitsInStock"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      defaultValue={productData.unitsInStock}
                      onChange={(e) => {
                        setUnitsInStock(e.target.value);
                      }}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Price</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      id="price"
                      name="price"
                      type="price"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      defaultValue={productData.price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      id="description"
                      name="description"
                      type="description"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      defaultValue={productData.description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Images</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul
                      role="list"
                      className="border border-gray-200 rounded-md divide-y divide-gray-200"
                    >
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <PaperClipIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-2 flex-1 w-0 truncate">
                            {/* {productData ? productData.image[0] : null} */}
                          </span>
                        </div>
                      </li>
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <PaperClipIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-2 flex-1 w-0 truncate">
                            {/* {productData ? productData.image[1] : null} */}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <PencilAltIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Edit
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default withDashboardLayout(DashboardSingleProduct);
