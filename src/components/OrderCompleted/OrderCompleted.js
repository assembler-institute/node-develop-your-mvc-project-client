import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useProducts } from "../../context/products";

function OrderCompleted() {
  const { orderCompleted } = useProducts();
  const { isAuth } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (!orderCompleted || !isAuth) {
      navigate("/", { replace: true });
    }
  }, []);
  
  return (
    <>
      <div>
        <h1>Order Completed</h1>
        <Link
          to="/"
          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          HOME
        </Link>
      </div>
    </>
  );
}

export default OrderCompleted;
