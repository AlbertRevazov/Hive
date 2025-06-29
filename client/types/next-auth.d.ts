import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
        name: string;
        email: string;
        image?: string;
        lastName?: string;
        firstName?: string;
        token?: string;
        provider?: string;
    }

    interface Session {
        user: User;
        expires: string;
    }
}
