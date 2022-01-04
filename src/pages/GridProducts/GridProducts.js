import React from "react";
import ProductListing from "../../components/ProductListing";
import withLayout from "../../hoc/withLayout";

function GridProducts() {
  return (
    <>
      <ProductListing />
    </>
  );
}

export default withLayout(GridProducts);
