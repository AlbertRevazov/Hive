'use client';
import type { IPerson } from 'next-auth';
import React, { FC } from 'react';

interface IPersonProps {
    userData: IPerson;
}

export const Person: FC<IPersonProps> = ({ userData }) => {
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

    return (
        <div>
            <div>
                <img src={img} alt={`${name} ${lastName}`} />
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
                <h2>Посты </h2>

                {userData.posts.map((el) => {
                    return (
                        <ul key={el.id}>
                            <li>Текст: {el.content}</li>
                            <li>Дата создания: {new Date(el.createdAt).toLocaleString()}</li>
                        </ul>
                    );
                })}
            </div>
        </div>
    );
};
