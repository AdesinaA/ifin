import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const baseUrl = process.env.API_URL;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();
        if (!res.ok) throw new Error(user.message || "Login failed");

        return {
          id: user.user.id,
          name: user.user.name,
          email: user.user.email,
          token: user.token,
          balance: user.user.balance,
          totalInvested: user.user.totalInvested,
          totalEarnings: user.user.totalEarnings,
          activeInvestments: user.user.activeInvestments,
          depositAddress: user.user.depositAddress,
          referralLink: user.user.referralLink,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour in seconds
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.token;
        token.balance = user.balance;
        token.totalInvested = user.totalInvested;
        token.totalEarnings = user.totalEarnings;
        token.activeInvestments = user.activeInvestments;
        token.depositAddress = user.depositAddress;
        token.referralLink = user.referralLink;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.accessToken = token.accessToken;
      session.user.balance = token.balance;
      session.user.totalInvested = token.totalInvested;
      session.user.totalEarnings = token.totalEarnings;
      session.user.activeInvestments = token.activeInvestments;
      session.user.depositAddress = token.depositAddress;
      session.user.referralLink = token.referralLink;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Redirect unauthenticated users to this page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
