import React from "react";
import withLayout from "../../hoc/withLayout";
import FormLogin from "../../components/FormLogin";


function Login() {
  return (
    <>
      <FormLogin />
    </>
  );
}

export default withLayout(Login);
