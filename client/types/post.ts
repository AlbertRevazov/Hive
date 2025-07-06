export interface IPost {
    id: number;
    content: string;
    createdAt: Date;
    isPublic: boolean;
    authorId: string;
}
