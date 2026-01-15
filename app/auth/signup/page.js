"use client";

// LibrRY

import { Suspense } from "react";

// Components
import SignUpComponent from "@/components/Auth/SignUp";

const SignUp = () => {
  return (
    <Suspense>
      <SignUpComponent />
    </Suspense>
  );
};

export default SignUp;
