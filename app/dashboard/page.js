"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Components
import DashboardOverview from "@/components/InvestorDashboard/pages_components/DashboardOverview";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return <DashboardOverview data={session} />;
};

export default DashboardPage;
