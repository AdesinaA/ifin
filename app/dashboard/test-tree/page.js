import ReferralTree from "@/components/InvestorDashboard/others/RefferalTree";

export default function ReferralPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Referral Network</h1>
      <ReferralTree />
    </div>
  );
}
