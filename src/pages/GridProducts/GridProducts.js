import React, { useEffect } from "react";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import Pagination from "../../components/Pagination";
import ProductListing from "../../components/ProductListing";
import {
  checkSession,
  getCurrentUser,
} from "../../context/authContext/localStorage";
import withLayout from "../../hoc/withLayout";
import { useAuth } from "../../context/authContext/reducer";

function GridProducts() {
  const { signInSuccess } = useAuth();
  const isLogged = checkSession();

  useEffect(() => {
    if (isLogged) {
      const currentUser = getCurrentUser();
      signInSuccess(currentUser);
    }
  }, []);

  return (
    <>
      <CategoryBar />
      <ProductListing />
{/*       <Pagination /> */}
    </>
  );
}

export default withLayout(GridProducts);
