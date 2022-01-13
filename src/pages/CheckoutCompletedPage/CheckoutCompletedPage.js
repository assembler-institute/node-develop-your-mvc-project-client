import React, { useEffect } from "react";
import OrderCompleted from "../../components/OrderCompleted/OrderCompleted";
import { useProducts } from "../../context/products";
import withLayout from "../../hoc/withLayout";

function CheckoutCompletedPage() {
  const { resetOrder } = useProducts();

  useEffect(() => {
    localStorage.removeItem("ShoppingCart");
    resetOrder();
  }, []);

  return (
    <>
      <OrderCompleted />
    </>
  );
}

export default withLayout(CheckoutCompletedPage);
