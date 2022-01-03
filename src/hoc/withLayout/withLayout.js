import React from "react";
import "./withLayout.css";

function withLayout(WrappedComponent) {
  function WrapperComponent({ ...props }) {
    return (
      <>
        <main className="flex h-screen flex-wrap">
          <WrappedComponent/>
        </main>
      </>
    );
  }

  return WrapperComponent;
}

export default withLayout;
