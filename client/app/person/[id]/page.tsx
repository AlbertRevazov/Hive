import { Person } from 'components/person';

export default async function ProfilePage({ params }) {
    const userId = params.id;

    try {
        const response = await fetch(`http://localhost:3333/person/${userId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        return <Person userData={userData} />;
    } catch (error) {
        return <div>Error loading user data: {error.message}</div>;
    }
}
