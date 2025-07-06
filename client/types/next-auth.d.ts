import NextAuth from 'next-auth';
import { IUser } from './user';

declare module 'next-auth' {
    interface User extends IUser {
        // Дополнительные поля, специфичные для NextAuth
        friends?: IUser[]; // Если нужно сразу подгружать друзей
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
        friendshipStatus: 'pending' | 'accepted' | 'rejected' | 'none';
    }
}
