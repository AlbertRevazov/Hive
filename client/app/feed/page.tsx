import React from 'react';
import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Feed } from 'components/feed';

const FeedPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect('/api/auth/sign');
    }

    try {
        const response = await fetch(`http://localhost:3333/feed/list/${session.user.id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch posts data');
        }

        const data = await response.json();

        return <Feed data={data} />;
    } catch (error) {
        console.error('Error in FeedPage:', error);
        return <div>Error loading user data: {error.message}</div>;
    }
};

export default FeedPage;
