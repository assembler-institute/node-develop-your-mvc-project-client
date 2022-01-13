import React from "react";
import "./withDashboardLayout.css";
import Footer from "../../components/Footer";
import DashboardNav from "../../components/DashboardNav/DashboardNav";

function withDashboardLayout(WrappedComponent) {
  function WrapperComponent({ ...props }) {
    return (
      <>
        <DashboardNav />
        <main className="flex flex-wrap justify-center items-center">
          <WrappedComponent />
        </main>
        <Footer />
      </>
    );
  }

  return WrapperComponent;
}

export default withDashboardLayout;
