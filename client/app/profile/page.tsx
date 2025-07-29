import React from 'react';
import { Profile } from '../../components/profile';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect('/api/auth/sign');
    }
    const { user } = session;

    try {
        const url =
            user.provider === 'credentials'
                ? 'http://localhost:3333/profile/user'
                : 'http://localhost:3333/profile/provider';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        if (response.status !== 200) {
            return <div>Error: {userData.message}</div>;
        }

        return <Profile profileData={userData} />;
    } catch (error) {
        return <div>Error loading user data: {error.message}</div>;
    }
}
