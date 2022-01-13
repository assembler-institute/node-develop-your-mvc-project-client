import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/reducer";
import { useProducts } from "../../context/products";
import { getCurrentUserToken } from "../../firebase/firebase";
import withLayout from "../../hoc/withLayout";
import loadLocalStorageItems from "../../hooks/useLoadLocalStorage";

function CheckoutForm() {
  const { currentUserData,isAuth } = useAuth();
  const { shoppingCart,orderFinished } = useProducts();
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const userToken = await getCurrentUserToken();

    const updatedShoppingCart = shoppingCart.map((item) => {
      return {
        product: item._id,
        quantity: item.quantity,
      };
    });

    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:4000/purchases",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          user: currentUserData._id,
          products: updatedShoppingCart,
        },
      });

      if (res.status === 201) {
        console.log(res.status);
        orderFinished();
        //<Navigate to="/completed" />;
        navigate("/completed", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(!isAuth){
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      <div className="mt-20"></div>
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">
              Payment Details
            </h2>
            <form
              className="justify-center w-full mx-auto"
              method="post"
              action=""
            >
              <div className="">
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="cardNumber"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Card Number
                    </label>
                    <input
                      name="cardNumber"
                      type="number"
                      placeholder="Card Number"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="mt-4 space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="expirationDate"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Expiration Date (MM/YY)
                    </label>
                    <input
                      name="expirationDate"
                      type="text"
                      placeholder="Expiration Date"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="cvc"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      CVC
                    </label>
                    <input
                      name="cvc"
                      type="number"
                      placeholder="CVC"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <h2 className="mt-4 mb-4 font-bold md:text-xl text-heading ">
                  Shipping Address
                </h2>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="address"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Address
                    </label>
                    <input
                      name="address"
                      type="text"
                      placeholder="address"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="mt-4 space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="number"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Number
                    </label>
                    <input
                      name="number"
                      type="text"
                      placeholder="number"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="city"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      City
                    </label>
                    <input
                      name="city"
                      type="number"
                      placeholder="City"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="mt-4 space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="state"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      State / Province
                    </label>
                    <input
                      name="state"
                      type="text"
                      placeholder="State"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="postcode"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Postal Code
                    </label>
                    <input
                      name="postcode"
                      type="text"
                      placeholder="PostCode"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <label
                    htmlFor="time"
                    className="flex items-center text-sm group text-heading"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                    />
                    <span className="ml-2">
                      Save this information for next time
                    </span>
                  </label>
                </div>

                <div className="mt-4">
                  <input
                    className="w-full whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    value="Process"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5 bg-gray-300 px-8 py-10 border-b">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-8">
                <div className="flex flex-col space-y-4 ">
                  <div className="flex space-x-4">
                    <div>
                      <img
                        src="https://source.unsplash.com/user/erondu/1600x900"
                        alt="image"
                        className="w-60"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Title</h2>
                      <p className="text-sm">Lorem ipsum dolor sit amet, tet</p>
                      <span className="text-red-600">Price</span> $20
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div>
                      <img
                        src="https://source.unsplash.com/collection/190727/1600x900"
                        alt="image"
                        className="w-60"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Title</h2>
                      <p className="text-sm">Lorem ipsum dolor sit amet, tet</p>
                      <span className="text-red-600">Price</span> $20
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex p-4 mt-4">
                <h2 className="text-xl font-bold">ITEMS 2</h2>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Subtotal<span className="ml-2">$40.00</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Shipping Tax<span className="ml-2">$10</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Total<span className="ml-2">$50.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutForm;
