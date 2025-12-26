"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import DashboardRefferals from "@/components/InvestorDashboard/pages_components/DashboardRefferals";
import GeneralLoader from "@/components/GenreralLoader";

const DashboardRefferalsPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") return <GeneralLoader />;

  return <DashboardRefferals data={session} />;
};

export default DashboardRefferalsPage;
