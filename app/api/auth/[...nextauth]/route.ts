import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

let users: any[] = [];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const user = users.find((item) => item.email === credentials.email);
        if (user?.password === credentials.password) {
          const modifiedUser = {
            ...user,
            accountStatus: 'Active',
          };

          return modifiedUser;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/autherror',
  },
};