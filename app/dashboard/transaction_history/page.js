"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import DashboardTransactionHistory from "@/components/InvestorDashboard/pages_components/DasshboardTransactionHistory";
import GeneralLoader from "@/components/GenreralLoader";

const DashboardTransactionHistoryPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") return <GeneralLoader />;

  return <DashboardTransactionHistory data={session} />;
};

export default DashboardTransactionHistoryPage;
