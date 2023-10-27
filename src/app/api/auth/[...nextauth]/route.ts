import { randomBytes, randomUUID } from 'crypto';
import NextAuth, { NextAuthOptions, User, getServerSession  } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/utils/connect';
import { Adapter } from 'next-auth/adapters';

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean;
  }
}

export const OPTIONS: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter<boolean>,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });
      token.isAdmin = userInDb?.isAdmin!;
      return token;
    },
  },
  secret: process.env.SECRET,
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };

export const getAuthSession = () => getServerSession(OPTIONS);