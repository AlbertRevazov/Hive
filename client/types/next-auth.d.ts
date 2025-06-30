import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
        name: string;
        email: string;
        phone?: string;
        img?: string;
        desc?: string;
        lastName?: string;
        firstName?: string;
        token?: string;
        isAdmin?: boolean;
        isBanned?: boolean;
        banExpires?: Date;
        lastOnline?: Date;
        createdAt?: Date;
        updatedAt?: Date;
        provider?: string;
    }

    interface Session {
        user: User;
        expires: string;
    }
    interface IPerson {
        person: User;
        posts: {
            content: string;
            createdAt: Date;
            id: number;
            isPublic: boolean;
        }[];
    }
}
