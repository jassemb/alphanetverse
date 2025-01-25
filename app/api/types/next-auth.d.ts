// types/next-auth.d.ts

import NextAuth, { DefaultSession, User } from "next-auth";

// Extend the User interface to include the token
declare module "next-auth" {
  interface User {
    token: string; // Add token field to User type
  }

  interface Session {
    user: User; // Ensure session user has the extended User type
  }
}
