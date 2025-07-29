'use client';
import { User } from 'next-auth/core/types';
import { useSession } from 'next-auth/react';
import React, { FC } from 'react';
import { useFriendship } from 'utils/UseFriendship';

interface UserPreview extends Pick<User, 'id' | 'name' | 'lastName' | 'img'> {
    requester: {
        id: number;
        img: string;
        lastName: string;
        name: string;
    };
}

interface INotificationsProps {
    data: { friends: UserPreview[] };
}

export const Notifications: FC<INotificationsProps> = ({ data }) => {
    const { getFriendsManage } = useFriendship();
    const session = useSession();
    return (
        <div>
            Приглашения в друзья
            {session?.data?.user &&
                data.friends.map((el) => {
                    return (
                        <div key={el.requester.id}>
                            <img
                                src={el.requester.img}
                                width={33}
                                alt={`${el.name} ${el.lastName}`}
                            />
                            {el.requester.name}
                            <button
                                onClick={() =>
                                    getFriendsManage(
                                        el.requester.id.toString(),
                                        session?.data?.user.id,
                                        'accept',
                                    )
                                }
                            >
                                Принять
                            </button>
                            <button
                                onClick={() =>
                                    getFriendsManage(
                                        el.requester.id.toString(),
                                        session?.data?.user.id,
                                        'reject',
                                    )
                                }
                            >
                                Отклонить
                            </button>
                        </div>
                    );
                })}
        </div>
    );
};
