export interface IUser {
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
