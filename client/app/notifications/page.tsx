import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { Notifications } from 'components/notifications';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const NotificationsPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect('/api/auth/sign');
    }

    try {
        const response = await fetch(`http://localhost:3333/friendship/${session.user.id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        return <Notifications data={data} />;
    } catch (error) {
        return <div>Error loading user data: {error.message}</div>;
    }
};

export default NotificationsPage;
