import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Dies ist eine vereinfachte Version - normalerweise würde hier eine Datenbankabfrage stattfinden
        // In diesem Beispiel erlauben wir einen einfachen Test-Login
        if (credentials?.email === 'admin@example.com' && credentials?.password === 'admin1234') {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@example.com',
            role: 'admin'
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 Stunden
  },
  secret: process.env.NEXTAUTH_SECRET || 'ein-sicheres-geheimnis-fuer-die-entwicklung',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 