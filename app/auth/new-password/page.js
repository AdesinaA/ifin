"use client";

import { Suspense } from "react";
import NewPasswordComponent from "@/components/Auth/NewPasswordComponent";

const NewPasswordPage = () => {
  return (
    <Suspense>
      <NewPasswordComponent />
    </Suspense>
  );
};

export default NewPasswordPage;
