'use client';
import { getServerSession } from 'next-auth/next';

import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { authConfig } from '../configs/auth';
import Link from 'next/link';

export const Component = () => {
  const session = useSession();
  const session2 = getSession();
  const { data } = session;

  const handleLogout = () => {
    signOut();
    // Дополнительный выход из Google
    window.location.href = 'https://accounts.google.com/logout';
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
      <Link href={'/api/auth/login'}>
        {' '}
        <button>Sign in</button>
      </Link>
    </>
  );
};
