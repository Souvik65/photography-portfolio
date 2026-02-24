import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? '';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    signIn({ user }) {
      // Only allow the whitelisted admin email
      if (!user.email || user.email !== ADMIN_EMAIL) {
        return false;
      }
      return true;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
});
