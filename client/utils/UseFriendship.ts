import { UUID } from 'crypto';
import { IFriendship } from 'next-auth';

export const useFriendship = () => {
    const getFriendsRequest = async (
        requesterId: UUID | string,
        addreserId: UUID | string,
        action: 'create' | 'remove',
    ) => {
        const response = await fetch(
            `http://localhost:3333/friendship/request?requesterId=${requesterId}&addresseeId=${addreserId}&action=${action}`,
        );
        const data = response.json();
        return data;
    };

    const getFriendsManage = async (
        requesterId: string,
        addreserId: string,
        action: 'accept' | 'reject',
    ) => {
        const response = await fetch('http://localhost:3333/friendship/manage', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requesterId, addreserId, action }),
        });
        const data = response.json();
        return data;
    };

    function getFriendshipButtonTitle(
        friendshipStatus: 'none' | 'pending' | 'accepted' | 'rejected',
        currentUserId: number,
        friendshipData: IFriendship,
    ) {
        if (!friendshipStatus || friendshipStatus === 'none') {
            return 'Добавить в друзья';
        }

        if (friendshipStatus === 'pending') {
            // Если текущий пользователь - получатель запроса
            if (friendshipData.addresseeId === currentUserId) {
                return 'Принять заявку';
            }
            return 'Ожидание подтверждения';
        }

        if (friendshipStatus === 'accepted') {
            return 'В друзьях';
        }

        if (friendshipStatus === 'rejected') {
            // Если текущий пользователь - тот, кто отклонил
            if (friendshipData.addresseeId === currentUserId) {
                return 'Вы отклонили заявку';
            }
            return 'Заявка отклонена';
        }

        return 'Добавить в друзья';
    }
    return { getFriendsRequest, getFriendsManage, getFriendshipButtonTitle };
};
