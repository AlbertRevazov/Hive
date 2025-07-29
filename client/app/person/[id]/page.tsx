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
        const response = await fetch(`http://localhost:3333/person`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ personId: params.id, user }),
        });

        const userData = await response.json();
        if (response.status !== 200) {
            return <div>Error: {userData.message}</div>;
        }

        return <Person userData={userData} user={user} />;
    } catch (error) {
        return <div>Error loading user data: {error.message}</div>;
    }
}
