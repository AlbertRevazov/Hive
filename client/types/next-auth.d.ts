import NextAuth from 'next-auth';
import { IUser } from './user';

declare module 'next-auth' {
    interface User extends IUser {
        id: string;
        name?: string | null;
        email?: string | null;
        img?: string | null;
        image?: string | null;
        provider?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        token?: string | null;
        dbUserId?: string;
        providerAccountId?: string;
        friends?: IUser[]; // Если нужно сразу подгружать друзей
    }

    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            img?: string | null;
            provider?: string | null;
            providerAccountId?: string;
            dbUserId?: string;
        };
    }

    interface IFriendship {
        addresseeId: number;
        createdAt: string;
        id: number;
        requesterId: number;
        status: 'pending' | 'accepted' | 'rejected' | 'none';
        updatedAt: string;
    }

    interface IPerson {
        person: User;
        posts: {
            content: string;
            createdAt: Date;
            id: number;
            isPublic: boolean;
        }[];
        friendship: IFriendship | 'none';
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        user?: {
            id: string;
            name?: string | null;
            email?: string | null;
            img?: string | null;
            provider?: string | null;
            providerAccountId?: string;
            dbUserId?: string;
        };
    }
}
