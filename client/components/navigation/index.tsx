'use client';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { navigationLinks } from 'data/links';
import Link from 'next/link';

const Navigation = () => {
    const pathname = usePathname();
    const session = useSession();

    return (
        <>
            {navigationLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                    <Link key={link.label} href={link.href} className={isActive ? 'active' : ''}>
                        {link.label}
                    </Link>
                );
            })}
            {session?.data && (
                <>
                    <Link href="/profile">Profile</Link>
                    <Link href="/notifications">Notifications</Link>
                </>
            )}
            {session?.data ? (
                <Link
                    href="#"
                    onClick={() =>
                        signOut({
                            callbackUrl: '/',
                        })
                    }
                >
                    Logout
                </Link>
            ) : (
                <Link href="/api/auth/sign">SignIn</Link>
            )}
        </>
    );
};

export { Navigation };
