import React from "react";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import withLayout from "../../hoc/withLayout";

function CheckoutPage() {
    return (<CheckoutForm />);
}

export default withLayout(CheckoutPage);