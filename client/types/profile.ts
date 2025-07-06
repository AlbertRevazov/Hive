import { User } from 'next-auth';
import { FriendshipStatus } from './friendship';
import { IPost } from './post';
import { IUser } from './user';

export interface IProfile extends IUser {
    user: User;
    posts: IPost[];
    friends: IUser[];
    friendshipStatus: FriendshipStatus;
    // comments: IComment[];
    // likes: ILike[];
}
