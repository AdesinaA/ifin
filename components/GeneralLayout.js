"use client";

import { SessionProvider } from "next-auth/react";

const GeneralLayout = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default GeneralLayout;
