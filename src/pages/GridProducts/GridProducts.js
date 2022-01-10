import React, { useEffect } from "react";
import Pagination from "../../components/Pagination";
import ProductListing from "../../components/ProductListing";
import withLayout from "../../hoc/withLayout";

function GridProducts() {
  return (
    <>
      <ProductListing />
      <Pagination />
    </>
  );
}

export default withLayout(GridProducts);
