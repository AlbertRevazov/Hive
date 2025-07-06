import { Person } from 'components/person';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function PersonPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect('/api/auth/sign');
    }
    const { user } = session;
    if (user.id === params.id) {
        redirect('/profile');
    }

    try {
        const response = await fetch(
            `http://localhost:3333/person/${params.id}?sessionId=${user.id}`,
        );
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();

        return <Person userData={userData} />;
    } catch (error) {
        return <div>Error loading user data: {error.message}</div>;
    }
}
