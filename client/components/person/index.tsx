'use client';
import React, { FC } from 'react';
import type { IFriendship, IPerson } from 'next-auth';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth/core/types';
import { useFriendship } from '../../utils/UseFriendship';

interface IPersonProps {
    userData: IPerson;
    user: User;
}

export const Person: FC<IPersonProps> = ({ userData, user }) => {
    const session = useSession();
    const {
        name,
        lastName,
        email,
        phone,
        desc,
        img,
        banExpires,
        createdAt,
        lastOnline,
        updatedAt,
        id,
    } = userData.person;
    const { friendship, posts } = userData;
    const { getFriendsRequest, getFriendshipButtonTitle } = useFriendship();
    const friendshipStatus = friendship === 'none' ? 'none' : friendship.status;
    const ButtonContent: React.ReactNode =
        friendshipStatus === 'accepted' ? (
            <button onClick={() => getFriendsRequest(user.id, id, 'remove')}>
                Убрать из друзей
            </button>
        ) : (
            getFriendshipButtonTitle(
                friendshipStatus,
                +session?.data?.user.id,
                friendship as IFriendship,
            )
        );

    return (
        <>
            <div>
                <img src={img} alt={`${name} ${lastName}`} loading="lazy" width={200} />
                <div>
                    <h1>
                        {name} {lastName}
                    </h1>
                    <p>{desc}</p>
                </div>
            </div>
            <div>
                <h2>Основная информация</h2>
                <ul>
                    <li>ID: {id}</li>
                    <li>Email: {email}</li>
                    <li>Телефон: {phone}</li>
                    {banExpires && (
                        <li>Дата блокировки: {new Date(banExpires).toLocaleString()}</li>
                    )}
                </ul>
            </div>
            <div>
                <h2>Активность</h2>
                <ul>
                    <li>Дата регистрации: {new Date(createdAt).toLocaleString()}</li>
                    <li>Последнее обновление: {new Date(updatedAt).toLocaleString()}</li>
                    <li>Был в сети: {new Date(lastOnline).toLocaleString()}</li>
                </ul>
            </div>
            <div>
                {!!userData.posts.length && (
                    <>
                        <h2>Посты </h2>

                        {posts.map((el) => {
                            return (
                                <ul key={el.id}>
                                    <li>Текст: {el.content}</li>
                                    <li>
                                        Дата создания: {new Date(el.createdAt).toLocaleString()}
                                    </li>
                                </ul>
                            );
                        })}
                    </>
                )}
            </div>{' '}
            {friendshipStatus === 'none' ? (
                <button onClick={() => getFriendsRequest(session.data?.user.id, id, 'create')}>
                    {ButtonContent}
                </button>
            ) : (
                ButtonContent
            )}
        </>
    );
};
