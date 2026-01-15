"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import DashboardSettings from "@/components/InvestorDashboard/pages_components/DashboardSettings";
import GeneralLoader from "@/components/GenreralLoader";

const DashboardSettingsPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") return <GeneralLoader />;

  return <DashboardSettings data={session} />;
};

export default DashboardSettingsPage;
