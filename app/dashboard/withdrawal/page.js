"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import DashboardWithdrawal from "@/components/InvestorDashboard/pages_components/DashboardWithdrawal";
import GeneralLoader from "@/components/GenreralLoader";

const DashboardDepositPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") return <GeneralLoader />;

  return <DashboardWithdrawal data={session} />;
};

export default DashboardDepositPage;
