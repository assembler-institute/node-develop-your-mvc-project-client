import React from "react";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import Pagination from "../../components/Pagination";
import ProductListing from "../../components/ProductListing";
import withLayout from "../../hoc/withLayout";

function GridProducts() {
  return (
    <>
      <CategoryBar />
      <ProductListing />
      <Pagination />
    </>
  );
}

export default withLayout(GridProducts);
