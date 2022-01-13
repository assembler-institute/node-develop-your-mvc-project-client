import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  checkSession,
  getCurrentUser,
} from "../../context/authContext/localStorage";
import { useAuth } from "../../context/authContext/reducer";
import { useProducts } from "../../context/products";
import withDashboardLayout from "../../hoc/withDashboardLayout/withDashboardLayout";
import { deleteProduct } from "../../utils/productData-request";

function DashboardProducts() {
  const isLogged = checkSession();
  const { signInSuccess } = useAuth();
  const { products, fetchAllProducts } = useProducts();
  useEffect(() => {
    fetchAllProducts();
    if (isLogged) {
      const currentUser = getCurrentUser();
      signInSuccess(currentUser);
    }
  }, []);
  async function handleDelete(id) {
    await deleteProduct(id);
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    U. Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={product.image[0]}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            <Link to={`/dashboard_products/${product._id}`}>
                              {product.title.substr(0, 50)}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-500">
                            {`${product.price}€`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.description.substr(0, 45)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.unitsInStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/dashboard_products/${product._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        // onClick={handleDelete(product._id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withDashboardLayout(DashboardProducts);
