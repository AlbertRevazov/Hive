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
        const response = await fetch(`http://localhost:3333/profile/user/${user.id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        return <Profile profileData={userData} />;
    } catch (error) {
        return <div>Error loading user data: {error.message}</div>;
    }
}
