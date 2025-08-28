'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export const Component = () => {
    const session = useSession();
    const { data } = session;
    const handleLogout = async () => {
        await signOut({
            callbackUrl: '/sign',
            redirect: false,
        });

        const provider = localStorage.getItem('auth_provider');

        if (provider === 'google') {
            window.open('https://accounts.google.com/logout', '_blank', 'noopener,noreferrer');
        } else if (provider === 'github') {
            window.open('https://github.com/logout', '_blank', 'noopener,noreferrer');
        }

        localStorage.removeItem('auth_provider');
        sessionStorage.clear();

        window.location.href = '/sign';
    };

    if (data) {
        return (
            <>
                Signed in as {data?.user.name}
                <br />
                <button onClick={() => handleLogout()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <Link href={'/api/auth/sign'}>
                {' '}
                <button>Sign in</button>
            </Link>
        </>
    );
};
