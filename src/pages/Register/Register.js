import React from "react";
import withLayout from "../../hoc/withLayout";
import FormRegister from "../../components/FormRegister";


function Register() {
  return (
    <>
      <FormRegister />
    </>
  );
}

export default withLayout(Register);
