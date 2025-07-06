import type { AuthOptions, User } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    img: profile.picture,
                    provider: 'google',
                };
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email,
                    img: profile.avatar_url,
                    provider: 'github',
                };
            },
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                action: { label: 'Action', type: 'hidden' },
            },
            async authorize(credentials) {
                try {
                    const endpoint =
                        credentials?.action === 'register'
                            ? 'http://localhost:3333/auth/signUp'
                            : 'http://localhost:3333/auth/signIn';

                    const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(credentials),
                    });

                    if (!response.ok) return null;

                    const data = await response.json();
                    return {
                        id: data.data.id.toString(),
                        name: `${data.data.name} ${data.data.lastName}`,
                        firstName: data.data.name,
                        lastName: data.data.lastName,
                        email: data.data.email,
                        img: data.data.img,
                        token: data.token,
                        provider: 'credentials',
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
                        id: user.id || '',
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
            session.user.id = token.sub;
            return session;
        },
    },
    pages: {
        signIn: 'sign', // страница входа
    },
    session: {
        strategy: 'jwt',
    },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
