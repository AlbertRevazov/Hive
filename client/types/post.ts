interface IUser {
    id: number;
    img: string;
    name: string;
    lastName: string;
}

interface IPostLike {
    id: number;
    postId: number;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: IUser;
}

export interface IPostComment {
    id: number;
    postId: number;
    text: string;
    author: IUser;
    createdAt: string;
    updatedAt: string;
}

export interface IPost {
    id: string;
    authorId: number;
    content: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    likes: IPostLike[];
    comments: IPostComment[];
    author: IUser;
}
