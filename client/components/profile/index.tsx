'use client';
import { FC } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { IProfile } from 'types/profile';

export interface IProfileProps {
    profileData: IProfile;
}

export const Profile: FC<IProfileProps> = ({ profileData }) => {
    const session = useSession();

    if (session.status === 'loading') return <div>Loading...</div>;

    const { user } = session.data;
    return (
        <div>
            <div>
                <div>
                    <h1>Profile of {user.name}</h1>
                    {user.image && <img src={user.image} alt="" />}
                </div>
                <Link
                    href="#"
                    onClick={() =>
                        signOut({
                            callbackUrl: '/nen',
                        })
                    }
                >
                    Sign Out
                </Link>
            </div>
            {profileData?.friends &&
                profileData.friends.map((el) => (
                    <Link key={el.id} href={`/person/${el.id}`}>
                        {el.name}
                        <img src={el.img} alt="" />
                    </Link>
                ))}
        </div>
    );
};
