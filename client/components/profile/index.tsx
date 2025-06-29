'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export const Profile = () => {
    const session = useSession();
    const { data } = session;

    return (
        <div>
            <div>
                <div>
                    <h1>Profile of {data?.user.name}</h1>
                    {data?.user?.image && <img src={data?.user.image} alt="" />}
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
        </div>
    );
};
