'use client';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const Profile = () => {
    const session = useSession();
    const { data } = session;
    const [profileData, setProfileData] = useState(null);
    useEffect(() => {
        if (data?.user?.id) {
            fetch(`http://localhost:3333/profile/user/${data.user.id}`)
                .then((res) => res.json())
                .then((data) => setProfileData(data));
        }
    }, [data?.user?.id]);

    if (!profileData) return <div>Loading...</div>;
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
