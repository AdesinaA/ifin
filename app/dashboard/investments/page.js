"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import DashboardInvestments from "@/components/InvestorDashboard/pages_components/DashboardInvestments";
import GeneralLoader from "@/components/GenreralLoader";

const DashboardPackagesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") return <GeneralLoader />;
  return <DashboardInvestments data={session} />;
};

export default DashboardPackagesPage;
