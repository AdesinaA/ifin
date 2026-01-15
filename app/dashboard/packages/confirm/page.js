"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { Suspense } from "react";

import DashboardPackagesConfirm from "@/components/InvestorDashboard/pages_components/DashboardPackagesConfirm";
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
  return (
    <Suspense>
      <DashboardPackagesConfirm data={session} />
    </Suspense>
  );
};

export default DashboardPackagesPage;
