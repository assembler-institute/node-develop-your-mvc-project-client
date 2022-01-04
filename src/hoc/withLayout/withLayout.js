import React from "react";
import "./withLayout.css";
import Navbar from "../../components/Navbar";

function withLayout(WrappedComponent) {
  function WrapperComponent({ ...props }) {
    return (
      <>
        <Navbar />
        <main className="flex flex-wrap justify-center items-center">
          <WrappedComponent />
        </main>
      </>
    );
  }

  return WrapperComponent;
}

export default withLayout;
