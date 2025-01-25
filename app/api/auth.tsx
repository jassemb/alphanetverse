// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Custom JWT Auth",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch("http://51.77.230.180:8000/api/v1/auth/jwt/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username || "",
            password: credentials?.password || "",
          }),
        });

        const data = await res.json();

        console.log(data);

if (res.ok && data.token) {
  return {
    id: data.user.id,
    email: data.user.email,
    token: data.token, // This will now be recognized as valid
  };
} else {
  return null; // Authentication failed
}
      },
    }),
  ],
  session: {
    strategy: "jwt", // Make sure JWT is being used as the session strategy
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.token = user.token; // This will now be recognized as valid
      }
      return token;
    },
    async session({ session, token }) {
      // Type assertions to ensure correct types
      session.user.id = token.id as string; // Assert token.id as string
      session.user.email = token.email as string; // Assert token.email as string
      session.user.token = token.token as string; // Assert token.token as string
      return session;
    },
  },
});
