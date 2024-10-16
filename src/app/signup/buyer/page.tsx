import React, { Suspense } from "react";
import BuyerSignUpForm from "./buyer-signup-form";

const page = () => {
  return (
    <Suspense fallback={<div >Loading...</div>}>
      <BuyerSignUpForm />
    </Suspense>
  );
};

export default page;
