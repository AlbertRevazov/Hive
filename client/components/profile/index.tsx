'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export const Profile = () => {
  const session = useSession();
  return (
    <div>
      {session?.data ? (
        <div>
          <div>
            <h1>
              Profile of {session.data?.user.data?.name} {session.data?.user.data?.lastName}
            </h1>
            {session.data?.user?.image && <img src={session.data.user.image} alt="" />}
          </div>
          <Link
            href="#"
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
          >
            Sign Out
          </Link>
        </div>
      ) : (
        <Link href="/#" onClick={() => signIn(undefined)}>
          Sign In
          <button onClick={() => signIn('google')} className="provider-btn google">
            Войти через Google
          </button>
        </Link>
      )}
    </div>
  );
};
