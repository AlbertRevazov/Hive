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
