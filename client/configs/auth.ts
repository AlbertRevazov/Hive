import type { AuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          const response = await fetch('http://localhost:3333/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) return null;

          const user = await response.json();

          return {
            ...user,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Этот колбек вызывается как при входе, так и при обновлении сессии
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            ...user,
          },
        };
      }
      return token;
    },

    // Этот колбек вызывается при получении сессии на клиенте через useSession
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
  pages: {
    signIn: 'login', // страница входа
  },
  session: {
    strategy: 'jwt',
  },
};
